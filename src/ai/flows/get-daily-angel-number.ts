'use server';

/**
 * @fileOverview An AI agent for generating a daily angel number.
 *
 * - getDailyAngelNumber - A function that returns a random angel number.
 * - DailyAngelNumberOutput - The return type for the getDailyAngelNumber function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyAngelNumberOutputSchema = z.object({
  number: z.string().describe('A common angel number sequence, like "333", "1111", or "1212".'),
});
export type DailyAngelNumberOutput = z.infer<typeof DailyAngelNumberOutputSchema>;

export async function getDailyAngelNumber(): Promise<DailyAngelNumberOutput> {
  return getDailyAngelNumberFlow();
}

const prompt = ai.definePrompt({
  name: 'getDailyAngelNumberPrompt',
  output: {schema: DailyAngelNumberOutputSchema},
  prompt: `You are a spiritual guide. Please provide a common angel number sequence suitable for a "number of the day" reading. Examples include sequences of repeating digits (e.g., 333, 555), sequential numbers (e.g., 123, 456), or mirrored numbers (e.g., 1221, 1010). Do not provide any explanation, just the number sequence.`,
});

const getDailyAngelNumberFlow = ai.defineFlow(
  {
    name: 'getDailyAngelNumberFlow',
    outputSchema: DailyAngelNumberOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
