'use server';

/**
 * @fileOverview A Celtic Cross tarot reading AI agent.
 *
 * - celticCrossReading - A function that handles the Celtic Cross reading process.
 * - CelticCrossReadingOutput - The return type for the celticCrossReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CardReadingSchema = z.object({
    positionName: z.string().describe("The name of the position in the Celtic Cross spread."),
    positionNumber: z.number().describe("The number of the position (1-10)."),
    cardName: z.string().describe('The name of the tarot card (e.g., "The Fool").'),
    orientation: z.string().describe('The orientation of the card, either "upright" or "reversed".'),
    meaning: z.string().describe("A 2-4 sentence mystical interpretation of the card in its specific position within the spread, weaving in symbolism and spiritual insight."),
    imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
});

const CelticCrossReadingOutputSchema = z.object({
    cards: z.array(CardReadingSchema).length(10).describe("An array of 10 tarot card readings, one for each position in the Celtic Cross spread."),
    summary: z.string().describe("A 4-6 sentence summary that synthesizes the entire 10-card reading into a cohesive narrative, offering overarching guidance and insight."),
});
export type CelticCrossReadingOutput = z.infer<typeof CelticCrossReadingOutputSchema>;

export async function celticCrossReading(): Promise<CelticCrossReadingOutput> {
  return celticCrossReadingFlow();
}

const prompt = ai.definePrompt({
  name: 'celticCrossReadingPrompt',
  output: {schema: CelticCrossReadingOutputSchema},
  prompt: `You are a deeply intuitive and wise tarot reader with a mystical and spiritual presence. A user has requested a 10-card Celtic Cross reading. Your language should be warm, insightful, and rich with symbolism. Avoid generic advice and focus on providing profound spiritual guidance.

  Perform the following steps:
  1.  Randomly draw 10 cards from the 78-card tarot deck.
  2.  For each card, randomly determine its orientation ("upright" or "reversed").
  3.  Assign each card to one of the 10 positions of the Celtic Cross spread, in order.
  4.  Provide a deep, meaningful interpretation for each card based on its position and orientation.
  5.  Provide a final summary that weaves the individual card meanings into a cohesive story for the querent.

  The 10 positions of the Celtic Cross are:
  1.  **The Self / The Heart of the Matter**: Represents the querent and the core of their situation.
  2.  **The Challenge / Crossing Card**: The immediate obstacle or challenge at hand.
  3.  **The Past / Foundation**: The past events and foundations of the situation.
  4.  **The Recent Past / Below**: Events that have just passed, now moving into the subconscious.
  5.  **The Potential Outcome / Above**: The best possible outcome that can be achieved.
  6.  **The Near Future / Before**: What is likely to happen in the immediate future.
  7.  **The Self / Advice**: The querent's attitude and perspective on the situation.
  8.  **External Influences / The Environment**: The people, energies, or environment surrounding the querent.
  9.  **Hopes and Fears**: The querent's deepest hopes and fears regarding the situation.
  10. **The Final Outcome**: The ultimate result or culmination of the situation.

  Return the full reading in the specified format. Do not add any conversational text.`,
});

const celticCrossReadingFlow = ai.defineFlow(
  {
    name: 'celticCrossReadingFlow',
    outputSchema: CelticCrossReadingOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
