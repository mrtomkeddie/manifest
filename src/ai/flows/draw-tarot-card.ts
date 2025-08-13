
'use server';

/**
 * @fileOverview A tarot card drawing AI agent using a custom deck.
 *
 * - drawTarotCard - A function that handles the tarot card drawing process.
 * - DrawTarotCardOutput - The return type for the drawTarotCard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { customTarotDeck, type TarotCard } from '@/lib/tarot-deck';

const DrawTarotCardInputSchema = z.object({
  cardName: z.string(),
  orientation: z.enum(['upright', 'reversed']),
  meaning: z.string(),
});

const DrawTarotCardOutputSchema = z.object({
  cardName: z.string().describe('The name of the tarot card provided.'),
  orientation: z.string().describe('The orientation of the card provided.'),
  meaning: z.string().describe("A 2-3 sentence interpretation of the provided card meaning in its specific orientation."),
  affirmation: z.string().describe('A short, powerful affirmation related to the card\'s meaning.'),
  imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
  image: z.string().describe('The path to the image for the card.'),
});
export type DrawTarotCardOutput = z.infer<typeof DrawTarotCardOutputSchema>;

export async function drawTarotCard(): Promise<DrawTarotCardOutput> {
    // 1. Randomly select one card from the custom deck.
    const card = customTarotDeck[Math.floor(Math.random() * customTarotDeck.length)];
    
    // 2. Randomly determine its orientation.
    const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
    const meaning = orientation === 'upright' ? card.meaning_upright : card.meaning_reversed;

    // 3. Call the flow with the selected card data.
    const result = await drawTarotCardFlow({
        cardName: card.name,
        orientation,
        meaning
    });

    // 4. Add the image keywords and image path from the deck to the final result.
    return { ...result, imageKeywords: card.imageKeywords, image: card.image };
}

const PromptOutputSchema = DrawTarotCardOutputSchema.omit({ image: true, imageKeywords: true });

const prompt = ai.definePrompt({
  name: 'drawTarotCardPrompt',
  model: 'openai/deepseek-chat',
  input: {schema: DrawTarotCardInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `You are a mystical tarot reader. A user has drawn their daily card. 
  
  The card is the **{{{cardName}}} ({{{orientation}}})**.

  The core meaning is: "{{{meaning}}}"

  Based on this core meaning, provide the following:
  1.  A 2-3 sentence interpretation of this card for a daily reading.
  2.  A powerful, short affirmation related to the card's message.
  
  Return the information in the specified format. Do not add any conversational text.`,
});

const drawTarotCardFlow = ai.defineFlow(
  {
    name: 'drawTarotCardFlow',
    inputSchema: DrawTarotCardInputSchema,
    outputSchema: PromptOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
