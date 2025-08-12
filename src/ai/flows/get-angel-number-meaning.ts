
'use server';

/**
 * @fileOverview An AI agent for interpreting angel numbers.
 *
 * - getAngelNumberMeaning - A function that returns the meaning of an angel number.
 * - AngelNumberInput - The input type for the getAngelNumberMeaning function.
 * - AngelNumberOutput - The return type for the getAngelNumberMeaning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AngelNumberInputSchema = z.object({
  number: z
    .string()
    .describe('The angel number sequence, e.g., "444", "1111".'),
  topic: z
    .string()
    .describe("The user's area of focus for the reading (e.g., 'Love', 'Career', 'General').")
});
export type AngelNumberInput = z.infer<typeof AngelNumberInputSchema>;

const AngelNumberOutputSchema = z.object({
  meaning: z.string().describe('The spiritual meaning of the angel number in 2-3 concise sentences.'),
  affirmation: z.string().describe('A short, powerful affirmation related to the number\'s meaning.'),
});
export type AngelNumberOutput = z.infer<typeof AngelNumberOutputSchema>;

export async function getAngelNumberMeaning(input: AngelNumberInput): Promise<AngelNumberOutput> {
  return getAngelNumberMeaningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAngelNumberMeaningPrompt',
  input: {schema: AngelNumberInputSchema},
  output: {schema: AngelNumberOutputSchema},
  prompt: `You are a spiritual guide and expert in numerology. A user has provided an angel number and is seeking its meaning in the context of a specific life topic.

  Provide a concise, spiritual interpretation of the number's significance in 2-3 sentences. Then, provide a short, powerful affirmation that aligns with the number's message.
  
  Angel Number: {{{number}}}
  Topic: {{{topic}}}
  
  All interpretations must be framed within this context. Return the information in the specified format. Do not add any conversational text.`,
});

const getAngelNumberMeaningFlow = ai.defineFlow(
  {
    name: 'getAngelNumberMeaningFlow',
    inputSchema: AngelNumberInputSchema,
    outputSchema: AngelNumberOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
