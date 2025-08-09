'use server';

/**
 * @fileOverview A tarot card drawing AI agent.
 *
 * - drawTarotCard - A function that handles the tarot card drawing process.
 * - DrawTarotCardOutput - The return type for the drawTarotCard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DrawTarotCardOutputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card (e.g., "The Fool").'),
  orientation: z.string().describe('The orientation of the card, either "upright" or "reversed".'),
  meaning: z.string().describe("A 2-3 sentence interpretation of the card in its specific orientation."),
  affirmation: z.string().describe('A short, powerful affirmation related to the card\'s meaning.'),
  imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
});
export type DrawTarotCardOutput = z.infer<typeof DrawTarotCardOutputSchema>;

export async function drawTarotCard(): Promise<DrawTarotCardOutput> {
  return drawTarotCardFlow();
}

const prompt = ai.definePrompt({
  name: 'drawTarotCardPrompt',
  output: {schema: DrawTarotCardOutputSchema},
  prompt: `You are a mystical tarot reader. A user has asked for their daily card. 

  Perform the following steps:
  1.  Randomly select one of the 78 tarot cards from the Major or Minor Arcana.
  2.  Randomly determine if the card is "upright" or "reversed".
  3.  Provide the card's name.
  4.  Provide its meaning for the selected orientation in 2-3 concise sentences.
  5.  Provide a powerful, short affirmation related to the card's meaning.
  6.  Provide one or two keywords for generating an image of the card (e.g., "tarot sun", "tarot fool").
  
  Return the information in the specified format. Do not add any conversational text.`,
});

const drawTarotCardFlow = ai.defineFlow(
  {
    name: 'drawTarotCardFlow',
    outputSchema: DrawTarotCardOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
