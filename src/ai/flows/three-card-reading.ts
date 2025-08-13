
'use server';

/**
 * @fileOverview A 3-card tarot reading AI agent using a custom deck.
 *
 * - threeCardReading - A function that handles the 3-card reading process.
 * - ThreeCardReadingInput - The input type for the threeCardReading function.
 * - ThreeCardReadingOutput - The return type for the threeCardReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { customTarotDeck, type TarotCard } from '@/lib/tarot-deck';

const ThreeCardReadingInputSchema = z.object({
  topic: z
    .string()
    .describe("The user's area of focus for the reading (e.g., 'Love', 'Career', 'General')."),
});
export type ThreeCardReadingInput = z.infer<typeof ThreeCardReadingInputSchema>;


const CardReadingSchema = z.object({
    positionName: z.string().describe("The name of the position in the spread (Past, Present, Future)."),
    cardName: z.string().describe('The name of the tarot card (e.g., "The Fool").'),
    orientation: z.string().describe('The orientation of the card, either "upright" or "reversed".'),
    meaning: z.string().describe("A 2-3 sentence mystical interpretation of the card in its specific position within the spread, tailored to the user's chosen topic."),
    imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
    image: z.string().describe('The path to the image for the card.'),
});

const InternalCardReadingSchema = z.object({
    positionName: z.string(),
    cardName: z.string(),
    orientation: z.enum(['upright', 'reversed']),
    meaning: z.string(),
});

const ThreeCardReadingOutputSchema = z.object({
    cards: z.array(CardReadingSchema).length(3).describe("An array of 3 tarot card readings for Past, Present, and Future."),
    summary: z.string().describe("A 3-4 sentence summary that synthesizes the 3-card reading into a cohesive narrative, offering overarching guidance related to the user's chosen topic."),
});
export type ThreeCardReadingOutput = z.infer<typeof ThreeCardReadingOutputSchema>;

const PromptOutputCardSchema = CardReadingSchema.omit({ image: true, imageKeywords: true });
const PromptOutputSchema = ThreeCardReadingOutputSchema.omit({ cards: true }).extend({
    cards: z.array(PromptOutputCardSchema).length(3),
});

export async function threeCardReading(input: ThreeCardReadingInput): Promise<ThreeCardReadingOutput> {
    const positions = ['Past', 'Present', 'Future'];
    let drawnCards: TarotCard[] = [];
    let flowInputCards = [];

    while(drawnCards.length < 3) {
        const card = customTarotDeck[Math.floor(Math.random() * customTarotDeck.length)];
        if (!drawnCards.find(c => c.name === card.name)) {
            drawnCards.push(card);
        }
    }

    for (let i = 0; i < 3; i++) {
        const card = drawnCards[i];
        const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
        const meaning = orientation === 'upright' ? card.meaning_upright : card.meaning_reversed;
        flowInputCards.push({
            positionName: positions[i],
            cardName: card.name,
            orientation,
            meaning,
        });
    }

    const flowResult = await threeCardReadingFlow({ topic: input.topic, cards: flowInputCards });

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
  name: 'threeCardReadingPrompt',
  input: {schema: z.object({
      topic: z.string(),
      cards: z.array(InternalCardReadingSchema),
  })},
  output: {schema: PromptOutputSchema},
  prompt: `You are an insightful and wise tarot reader. A user has requested a 3-card "Past, Present, Future" reading focused on a specific topic.

  The user's chosen topic is: **{{{topic}}}**. All interpretations must be framed within this context.

  The cards drawn are:
  {{#each cards}}
  - **{{positionName}}**: {{cardName}} ({{orientation}})
    - Core Meaning: "{{meaning}}"
  {{/each}}
  
  Perform the following steps:
  1. For each card, provide a 2-3 sentence mystical interpretation based on its provided core meaning, its position in the spread (Past, Present, Future), and its relevance to the user's chosen topic: **{{{topic}}}**.
  2. Provide a final summary of 3-4 sentences that weaves the three card interpretations into a cohesive story, offering guidance specifically for their chosen topic.

  Return the full reading in the specified format. Do not add any conversational text.`,
});


const threeCardReadingFlow = ai.defineFlow(
  {
    name: 'threeCardReadingFlow',
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
        console.error("AI call for 3-card reading failed.", error);
        // Fallback in case of error
        return {
            cards: input.cards.map(card => ({
                positionName: card.positionName,
                cardName: card.cardName,
                orientation: card.orientation,
                meaning: "The spiritual energies are currently clouded. Please take a moment of reflection and try your reading again shortly.",
            })),
            summary: "The cards are veiled at this moment. The universe advises a period of quiet contemplation before seeking further guidance. Trust that clarity will come when the time is right."
        };
    }
  }
);
