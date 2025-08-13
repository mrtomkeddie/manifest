
'use server';

/**
 * @fileOverview A Celtic Cross tarot reading AI agent using a custom deck.
 *
 * - celticCrossReading - A function that handles the Celtic Cross reading process.
 * - CelticCrossReadingInput - The input type for the celticCrossReading function.
 * - CelticCrossReadingOutput - The return type for the celticCrossReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { customTarotDeck, type TarotCard } from '@/lib/tarot-deck';


const CelticCrossReadingInputSchema = z.object({
  topic: z
    .string()
    .describe("The user's area of focus for the reading (e.g., 'Love', 'Career', 'General')."),
});
export type CelticCrossReadingInput = z.infer<typeof CelticCrossReadingInputSchema>;

const CardReadingSchema = z.object({
    positionName: z.string().describe("The name of the position in the Celtic Cross spread."),
    positionNumber: z.number().describe("The number of the position (1-10)."),
    cardName: z.string().describe('The name of the tarot card (e.g., "The Fool").'),
    orientation: z.string().describe('The orientation of the card, either "upright" or "reversed".'),
    meaning: z.string().describe("A 2-4 sentence mystical interpretation of the card in its specific position within the spread, weaving in symbolism and spiritual insight. The interpretation should be tailored to the user's chosen topic."),
    imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
    image: z.string().describe('The path to the image for the card.'),
});

const InternalCardReadingSchema = z.object({
    positionName: z.string(),
    positionNumber: z.number(),
    cardName: z.string(),
    orientation: z.enum(['upright', 'reversed']),
    meaning: z.string(),
});

const CelticCrossReadingOutputSchema = z.object({
    cards: z.array(CardReadingSchema).length(10).describe("An array of 10 tarot card readings, one for each position in the Celtic Cross spread."),
    summary: z.string().describe("A 4-6 sentence summary that synthesizes the entire 10-card reading into a cohesive narrative, offering overarching guidance and insight related to the user's chosen topic."),
});
export type CelticCrossReadingOutput = z.infer<typeof CelticCrossReadingOutputSchema>;

const PromptOutputCardSchema = CardReadingSchema.omit({ image: true, imageKeywords: true });
const PromptOutputSchema = CelticCrossReadingOutputSchema.omit({ cards: true }).extend({
    cards: z.array(PromptOutputCardSchema).length(10),
});

export async function celticCrossReading(input: CelticCrossReadingInput): Promise<CelticCrossReadingOutput> {
    const positions = [
        "The Self / The Heart of the Matter", "The Challenge / Crossing Card", "The Past / Foundation", 
        "The Recent Past / Below", "The Potential Outcome / Above", "The Near Future / Before",
        "The Self / Advice", "External Influences / The Environment", "Hopes and Fears", "The Final Outcome"
    ];

    let drawnCards: TarotCard[] = [];
    let flowInputCards = [];

    while(drawnCards.length < 10) {
        const card = customTarotDeck[Math.floor(Math.random() * customTarotDeck.length)];
        if (!drawnCards.find(c => c.name === card.name)) {
            drawnCards.push(card);
        }
    }
    
    for (let i = 0; i < 10; i++) {
        const card = drawnCards[i];
        const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
        const meaning = orientation === 'upright' ? card.meaning_upright : card.meaning_reversed;
        flowInputCards.push({
            positionName: positions[i],
            positionNumber: i + 1,
            cardName: card.name,
            orientation,
            meaning,
        });
    }

    const flowResult = await celticCrossReadingFlow({ topic: input.topic, cards: flowInputCards });

    // Combine flow result with image keywords and path
    const finalCards = flowResult.cards.map((card, index) => ({
        ...card,
        imageKeywords: drawnCards[index].imageKeywords,
        image: drawnCards[index].image,
    }));

    return {
        cards: finalCards,
        summary: flowResult.summary,
    };
}

const prompt = ai.definePrompt({
  name: 'celticCrossReadingPrompt',
  model: 'deepseek-chat',
  input: {schema: z.object({
    topic: z.string(),
    cards: z.array(InternalCardReadingSchema),
  })},
  output: {schema: PromptOutputSchema},
  prompt: `You are a deeply intuitive and wise tarot reader with a mystical and spiritual presence. A user has requested a 10-card Celtic Cross reading focused on a specific topic. Your language should be warm, insightful, and rich with symbolism. Avoid generic advice and focus on providing profound spiritual guidance tailored to the user's area of interest.

  The user's chosen topic is: **{{{topic}}}**. All interpretations must be framed within this context.

  The cards drawn for each position are:
  {{#each cards}}
  - **Position {{positionNumber}}. {{positionName}}**: {{cardName}} ({{orientation}})
    - Core Meaning: "{{meaning}}"
  {{/each}}

  Perform the following steps:
  1.  For each of the 10 cards, provide a deep, meaningful interpretation (2-4 sentences) based on its provided core meaning, its specific position in the Celtic Cross spread, and its relevance to the user's chosen topic: **{{{topic}}}**.
  2.  Provide a final summary (4-6 sentences) that weaves the individual card interpretations into a cohesive story for the querent, offering guidance specifically for their chosen topic.

  Return the full reading in the specified format. Do not add any conversational text.`,
});

const celticCrossReadingFlow = ai.defineFlow(
  {
    name: 'celticCrossReadingFlow',
    inputSchema: z.object({
        topic: z.string(),
        cards: z.array(InternalCardReadingSchema),
    }),
    outputSchema: PromptOutputSchema,
  },
  async (input) => {
    try {
        const {output} = await prompt(input);
        if (!output) {
            throw new Error("AI output was null or undefined.");
        }
        return output;
    } catch (error) {
        console.error("AI call for Celtic Cross reading failed.", error);
        // Fallback in case of error
        return {
            cards: input.cards.map(card => ({
                positionName: card.positionName,
                positionNumber: card.positionNumber,
                cardName: card.cardName,
                orientation: card.orientation,
                meaning: "The spiritual energies are currently clouded. Please take a moment of reflection and try your reading again shortly.",
            })),
            summary: "The cards are veiled at this moment. The universe advises a period of quiet contemplation before seeking further guidance. Trust that clarity will come when the time is right."
        };
    }
  }
);
