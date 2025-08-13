
'use server';

/**
 * @fileOverview An AI agent for providing moon phase information.
 *
 * - getMoonPhase - A function that returns details for a given date.
 * - GetMoonPhaseInput - The input type for the getMoonPhase function.
 * - GetMoonPhaseOutput - The return type for the getMoonPhase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetMoonPhaseInputSchema = z.object({
  date: z
    .string()
    .describe('The date to get the moon phase for, in YYYY-MM-DD format.'),
  isNorthernHemisphere: z.boolean().describe("Whether the user is in the Northern Hemisphere. This affects the visual appearance and some traditions."),
});
export type GetMoonPhaseInput = z.infer<typeof GetMoonPhaseInputSchema>;

const GetMoonPhaseInternalInputSchema = z.object({
  date: z.string(),
  phaseName: z.string(),
  isNorthernHemisphere: z.boolean(),
});

const GetMoonPhaseOutputSchema = z.object({
  imageKeywords: z.string().describe('One or two keywords for generating an image of this moon phase, like "new moon" or "full moon".'),
  phaseName: z.string().describe('The name of the moon phase (e.g., "New Moon", "Waxing Crescent").'),
  description: z.string().describe("A 2-3 sentence spiritual interpretation of the moon phase's energy, taking hemisphere into account."),
  ritual: z.string().describe("A short, simple ritual suggestion for this moon phase, tailored to the hemisphere."),
  affirmation: z.string().describe('A short, powerful affirmation related to the phase\'s energy.'),
});

export type GetMoonPhaseOutput = z.infer<typeof GetMoonPhaseOutputSchema>;

export async function getMoonPhase(input: GetMoonPhaseInput): Promise<GetMoonPhaseOutput> {
  return getMoonPhaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMoonPhasePrompt',
  input: {schema: GetMoonPhaseInternalInputSchema},
  output: {schema: GetMoonPhaseOutputSchema},
  prompt: `You are a spiritual guide and astrologer specializing in lunar cycles. A user has provided a date and their hemisphere to get a reading.

  The date is {{{date}}}.
  The calculated moon phase is "{{{phaseName}}}".
  The user is in the {{#if isNorthernHemisphere}}Northern{{else}}Southern{{/if}} Hemisphere.
  
  **Hemisphere-Specific Guidance is Crucial:**
  - In the **Northern Hemisphere**, the moon "waxes" (grows) from right to left. The energy is about building, growth, and manifestation.
  - In the **Southern Hemisphere**, the moon "waxes" (grows) from left to right. This hemisphere's traditions often associate the waxing visual with the waning energy of release, introspection, and letting go. The spiritual interpretation must be different.

  Please provide a reading structured as follows:
    -   **phaseName**: Confirm the phase name: "{{{phaseName}}}".
    -   **description**: A 2-3 sentence spiritual interpretation of the energy of that phase, making sure it is **distinct and appropriate** for the user's hemisphere.
    -   **ritual**: A simple, actionable ritual suggestion for working with this energy.
    -   **affirmation**: A short, powerful affirmation that aligns with the phase.
  
  Finally, provide **imageKeywords** for the moon phase (e.g., "full moon", "waning crescent").
  
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

    const {output} = await prompt({ date: input.date, phaseName, isNorthernHemisphere: input.isNorthernHemisphere });
    return output!;
  }
);
