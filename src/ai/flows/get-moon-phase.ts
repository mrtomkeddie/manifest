'use server';

/**
 * @fileOverview An AI agent for providing moon phase information.
 *
 * - getMoonPhase - A function that returns details about the moon phase for a given date.
 * - GetMoonPhaseInput - The input type for the getMoonPhase function.
 * - GetMoonPhaseOutput - The return type for the getMoonPhase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMoonPhaseInputSchema = z.object({
  date: z
    .string()
    .describe('The date to get the moon phase for, in YYYY-MM-DD format.'),
});
export type GetMoonPhaseInput = z.infer<typeof GetMoonPhaseInputSchema>;

const GetMoonPhaseOutputSchema = z.object({
  phaseName: z.string().describe('The name of the moon phase (e.g., "New Moon", "Waxing Crescent").'),
  description: z.string().describe("A 2-3 sentence spiritual interpretation of the moon phase's energy."),
  ritual: z.string().describe("A short, simple ritual suggestion for this moon phase."),
  affirmation: z.string().describe('A short, powerful affirmation related to the phase\'s energy.'),
  imageKeywords: z.string().describe('One or two keywords for generating an image of this moon phase, like "new moon" or "full moon".'),
});
export type GetMoonPhaseOutput = z.infer<typeof GetMoonPhaseOutputSchema>;

export async function getMoonPhase(input: GetMoonPhaseInput): Promise<GetMoonPhaseOutput> {
  return getMoonPhaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMoonPhasePrompt',
  input: {schema: GetMoonPhaseInputSchema},
  output: {schema: GetMoonPhaseOutputSchema},
  prompt: `You are a spiritual guide and astrologer specializing in lunar cycles. A user has provided a date and wants to know about the moon phase.

  Based on the date provided ({{{date}}}), determine the correct moon phase. The eight major phases are New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Third Quarter, and Waning Crescent.
  
  Then, provide the following:
  1.  The name of the moon phase.
  2.  A 2-3 sentence spiritual interpretation of the energy of that phase.
  3.  A simple, actionable ritual suggestion for working with this energy.
  4.  A short, powerful affirmation that aligns with the phase.
  5.  One or two keywords for generating an image (e.g., "full moon", "waning crescent").
  
  Date: {{{date}}}
  
  Return the information in the specified format. Do not add any conversational text.`,
});

const getMoonPhaseFlow = ai.defineFlow(
  {
    name: 'getMoonPhaseFlow',
    inputSchema: GetMoonPhaseInputSchema,
    outputSchema: GetMoonPhaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
