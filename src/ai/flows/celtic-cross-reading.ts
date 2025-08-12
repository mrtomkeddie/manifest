'use server';

/**
 * @fileOverview A Celtic Cross tarot reading AI agent.
 *
 * - celticCrossReading - A function that handles the Celtic Cross reading process.
 * - CelticCrossReadingInput - The input type for the celticCrossReading function.
 * - CelticCrossReadingOutput - The return type for the celticCrossReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
});

const CelticCrossReadingOutputSchema = z.object({
    cards: z.array(CardReadingSchema).length(10).describe("An array of 10 tarot card readings, one for each position in the Celtic Cross spread."),
    summary: z.string().describe("A 4-6 sentence summary that synthesizes the entire 10-card reading into a cohesive narrative, offering overarching guidance and insight related to the user's chosen topic."),
});
export type CelticCrossReadingOutput = z.infer<typeof CelticCrossReadingOutputSchema>;

export async function celticCrossReading(input: CelticCrossReadingInput): Promise<CelticCrossReadingOutput> {
  return celticCrossReadingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'celticCrossReadingPrompt',
  input: {schema: CelticCrossReadingInputSchema},
  output: {schema: CelticCrossReadingOutputSchema},
  prompt: `You are a deeply intuitive and wise tarot reader with a mystical and spiritual presence. A user has requested a 10-card Celtic Cross reading focused on a specific topic. Your language should be warm, insightful, and rich with symbolism. Avoid generic advice and focus on providing profound spiritual guidance tailored to the user's area of interest.

  The user's chosen topic is: **{{{topic}}}**. All interpretations must be framed within this context.

  Perform the following steps:
  1.  Randomly draw 10 cards from the 78-card tarot deck.
  2.  For each card, randomly determine its orientation ("upright" or "reversed").
  3.  Assign each card to one of the 10 positions of the Celtic Cross spread, in order.
  4.  Provide a deep, meaningful interpretation for each card based on its position, orientation, and its relevance to the user's chosen topic: **{{{topic}}}**.
  5.  Provide a final summary that weaves the individual card meanings into a cohesive story for the querent, offering guidance specifically for their chosen topic.

  The 10 positions of the Celtic Cross are:
  1.  **The Self / The Heart of the Matter**: Represents the querent and the core of their situation regarding the topic.
  2.  **The Challenge / Crossing Card**: The immediate obstacle or challenge at hand regarding the topic.
  3.  **The Past / Foundation**: The past events and foundations of the situation regarding the topic.
  4.  **The Recent Past / Below**: Events that have just passed, now moving into the subconscious, related to the topic.
  5.  **The Potential Outcome / Above**: The best possible outcome that can be achieved regarding the topic.
  6.  **The Near Future / Before**: What is likely to happen in the immediate future regarding the topic.
  7.  **The Self / Advice**: The querent's attitude and perspective on the situation regarding the topic.
  8.  **External Influences / The Environment**: The people, energies, or environment surrounding the querent regarding the topic.
  9.  **Hopes and Fears**: The querent's deepest hopes and fears regarding the topic.
  10. **The Final Outcome**: The ultimate result or culmination of the situation regarding the topic.

  Return the full reading in the specified format. Do not add any conversational text.`,
});

const celticCrossReadingFlow = ai.defineFlow(
  {
    name: 'celticCrossReadingFlow',
    inputSchema: CelticCrossReadingInputSchema,
    outputSchema: CelticCrossReadingOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
