
'use server';

/**
 * @fileOverview An AI agent for generating daily horoscopes.
 *
 * - getDailyHoroscope - A function that returns a horoscope for a given zodiac sign.
 * - GetDailyHoroscopeInput - The input type for the getDailyHoroscope function.
 * - GetDailyHoroscopeOutput - The return type for the getDailyHoroscope function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDailyHoroscopeInputSchema = z.object({
  sign: z
    .string()
    .describe('The zodiac sign for which to generate the horoscope (e.g., "Aries", "Taurus").'),
});
export type GetDailyHoroscopeInput = z.infer<typeof GetDailyHoroscopeInputSchema>;

const GetDailyHoroscopeOutputSchema = z.object({
  horoscope: z.string().describe('The generated daily horoscope. It should be 3-4 sentences long, providing empowering and insightful guidance.'),
});
export type GetDailyHoroscopeOutput = z.infer<typeof GetDailyHoroscopeOutputSchema>;

export async function getDailyHoroscope(input: GetDailyHoroscopeInput): Promise<GetDailyHoroscopeOutput> {
  return getDailyHoroscopeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getDailyHoroscopePrompt',
  model: 'deepseek-chat',
  input: {schema: GetDailyHoroscopeInputSchema},
  output: {schema: GetDailyHoroscopeOutputSchema},
  prompt: `You are a modern, empowering astrologer. Your tone is like a wise, supportive friend who understands the cosmos. A user has requested a daily horoscope for their zodiac sign. 

  The message should be insightful, encouraging, and focused on personal power, intuition, and manifestation. It should be 3-4 sentences long. Avoid generic predictions and instead offer spiritual guidance.

  The user's sign is: **{{{sign}}}**.

  Generate a unique, uplifting horoscope for today. Return only the horoscope in the specified format. Do not add any conversational text.`,
});

const getDailyHoroscopeFlow = ai.defineFlow(
  {
    name: 'getDailyHoroscopeFlow',
    inputSchema: GetDailyHoroscopeInputSchema,
    outputSchema: GetDailyHoroscopeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
