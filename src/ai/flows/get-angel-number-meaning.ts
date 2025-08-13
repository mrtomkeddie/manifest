
'use server';

/**
 * @fileOverview An AI agent for interpreting angel numbers.
 *
 * - getAngelNumberMeaning - A function that returns the meaning of an angel number for one or more topics.
 * - AngelNumberInput - The input type for the getAngelNumberMeaning function.
 * - AngelNumberOutput - The return type for the getAngelNumberMeaning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AngelNumberInputSchema = z.object({
  number: z
    .string()
    .describe('The angel number sequence, e.g., "444", "1111".'),
  topics: z
    .array(z.string())
    .describe("The user's areas of focus for the reading (e.g., ['Love', 'Career', 'General']).")
});
export type AngelNumberInput = z.infer<typeof AngelNumberInputSchema>;

const AngelNumberReadingSchema = z.object({
  topic: z.string().describe('The topic of the reading (e.g., Love, Career).'),
  meaning: z.string().describe('The spiritual meaning of the angel number in 2-3 concise sentences for this topic.'),
  affirmation: z.string().describe('A short, powerful affirmation related to the number\'s meaning for this topic.'),
});

const AngelNumberOutputSchema = z.object({
  readings: z.array(AngelNumberReadingSchema).describe("An array of readings for the angel number, one for each topic."),
});
export type AngelNumberOutput = z.infer<typeof AngelNumberOutputSchema>;

export async function getAngelNumberMeaning(input: AngelNumberInput): Promise<AngelNumberOutput> {
  return getAngelNumberMeaningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAngelNumberMeaningPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AngelNumberInputSchema},
  output: {schema: AngelNumberOutputSchema},
  prompt: `You are a spiritual guide and expert in numerology. A user has provided an angel number and is seeking its meaning in the context of several life topics.

  For each topic, provide a concise, spiritual interpretation of the number's significance in 2-3 sentences. Then, provide a short, powerful affirmation that aligns with the number's message.
  
  Angel Number: {{{number}}}
  
  Generate a reading for each of the following topics:
  {{#each topics}}
  - {{{this}}}
  {{/each}}
  
  Return the information in the specified format. Do not add any conversational text.`,
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
