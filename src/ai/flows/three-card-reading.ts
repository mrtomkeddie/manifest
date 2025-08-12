
'use server';

/**
 * @fileOverview A 3-card tarot reading AI agent.
 *
 * - threeCardReading - A function that handles the 3-card reading process.
 * - ThreeCardReadingInput - The input type for the threeCardReading function.
 * - ThreeCardReadingOutput - The return type for the threeCardReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
});

const ThreeCardReadingOutputSchema = z.object({
    cards: z.array(CardReadingSchema).length(3).describe("An array of 3 tarot card readings for Past, Present, and Future."),
    summary: z.string().describe("A 3-4 sentence summary that synthesizes the 3-card reading into a cohesive narrative, offering overarching guidance related to the user's chosen topic."),
});
export type ThreeCardReadingOutput = z.infer<typeof ThreeCardReadingOutputSchema>;

export async function threeCardReading(input: ThreeCardReadingInput): Promise<ThreeCardReadingOutput> {
  return threeCardReadingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'threeCardReadingPrompt',
  input: {schema: ThreeCardReadingInputSchema},
  output: {schema: ThreeCardReadingOutputSchema},
  prompt: `You are an insightful and wise tarot reader. A user has requested a 3-card "Past, Present, Future" reading focused on a specific topic. Your language should be warm, insightful, and clear.

  The user's chosen topic is: **{{{topic}}}**. All interpretations must be framed within this context.

  Perform the following steps:
  1.  Randomly draw 3 cards from the 78-card tarot deck.
  2.  For each card, randomly determine its orientation ("upright" or "reversed").
  3.  Assign each card to one of the 3 positions of the spread, in order.
  4.  Provide a meaningful interpretation for each card based on its position, orientation, and its relevance to the user's chosen topic: **{{{topic}}}**.
  5.  Provide a final summary that weaves the three card meanings into a cohesive story, offering guidance specifically for their chosen topic.

  The 3 positions of the spread are:
  1.  **Past**: Represents the past events and foundations of the situation regarding the topic.
  2.  **Present**: Represents the current state of the situation and the immediate challenge or focus.
  3.  **Future**: Represents the potential outcome and the direction the situation is heading.

  Return the full reading in the specified format. Do not add any conversational text.`,
});

const threeCardReadingFlow = ai.defineFlow(
  {
    name: 'threeCardReadingFlow',
    inputSchema: ThreeCardReadingInputSchema,
    outputSchema: ThreeCardReadingOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
