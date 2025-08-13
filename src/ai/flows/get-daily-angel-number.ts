
'use server';

/**
 * @fileOverview A function for providing the daily angel number.
 *
 * - getDailyAngelNumber - A function that returns a deterministic angel number for the day.
 * - DailyAngelNumberOutput - The return type for the getDailyAngelNumber function.
 */

import {z} from 'genkit';

const DailyAngelNumberOutputSchema = z.object({
  number: z.string().describe('A common angel number sequence, like "333", "1111", or "1212".'),
});
export type DailyAngelNumberOutput = z.infer<typeof DailyAngelNumberOutputSchema>;

const angelNumbers = [
    "111", "222", "333", "444", "555", "666", "777", "888", "999",
    "1111", "1212", "1010", "2121", "313", "414"
];

/**
 * Returns a deterministic "angel number of the day" based on the current date.
 * This function does not use an AI call to ensure it is fast, reliable, and
 * does not consume API quotas.
 */
export async function getDailyAngelNumber(): Promise<DailyAngelNumberOutput> {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % angelNumbers.length;
  const number = angelNumbers[index];
  
  return Promise.resolve({ number });
}
