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

const GetMoonPhaseInternalInputSchema = z.object({
  date: z.string(),
  phaseName: z.string(),
});

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
  input: {schema: GetMoonPhaseInternalInputSchema},
  output: {schema: GetMoonPhaseOutputSchema},
  prompt: `You are a spiritual guide and astrologer specializing in lunar cycles. A user has provided a date and the corresponding moon phase.

  The moon phase for the date {{{date}}} is "{{{phaseName}}}".
  
  Please provide the following based on this specific moon phase:
  1.  The name of the moon phase (confirm it is "{{{phaseName}}}").
  2.  A 2-3 sentence spiritual interpretation of the energy of that phase.
  3.  A simple, actionable ritual suggestion for working with this energy.
  4.  A short, powerful affirmation that aligns with the phase.
  5.  One or two keywords for generating an image (e.g., "full moon", "waning crescent").
  
  Return the information in the specified format. Do not add any conversational text.`,
});

const getMoonPhaseFlow = ai.defineFlow(
  {
    name: 'getMoonPhaseFlow',
    inputSchema: GetMoonPhaseInputSchema,
    outputSchema: GetMoonPhaseOutputSchema,
  },
  async (input) => {
    // Simple moon phase calculation
    const date = new Date(input.date + 'T00:00:00Z');
    const synodicMonth = 29.53058867;
    const knownNewMoon = new Date('2000-01-06T18:14:00Z').getTime();
    const daysSinceKnownNewMoon = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const phase = (daysSinceKnownNewMoon % synodicMonth) / synodicMonth;

    const phases = [
      "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
      "Full Moon", "Waning Gibbous", "Third Quarter", "Waning Crescent"
    ];
    
    // There are 8 phases, so we multiply by 8 and take the floor.
    // We add 0.5 and take modulo 8 to center the phases.
    const phaseIndex = Math.floor((phase * 8 + 0.5) % 8);
    const phaseName = phases[phaseIndex];

    const {output} = await prompt({ date: input.date, phaseName });
    return output!;
  }
);
