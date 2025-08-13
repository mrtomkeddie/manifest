
'use server';

/**
 * @fileOverview An AI agent for providing moon phase information for manifestation.
 *
 * - getMoonPhase - A function that returns details for a given date.
 * - GetMoonPhaseInput - The input type for the getMoonPhase function.
 * - GetMoonPhaseOutput - The return type for the getMoonPhase function.
 */

import {ai} from '@/ai/genkit';
import { getMoonZodiacSign } from '@/services/astrology-service';
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
  zodiacSign: z.string(),
  isNorthernHemisphere: z.boolean(),
});

const GetMoonPhaseOutputSchema = z.object({
  imageKeywords: z.string().describe('One or two keywords for generating an image of this moon phase, like "new moon" or "full moon".'),
  phaseName: z.string().describe('The name of the moon phase (e.g., "New Moon", "Waxing Crescent").'),
  zodiacSign: z.string().describe('The zodiac sign the moon is currently in (e.g., "Aries", "Taurus").'),
  description: z.string().describe("A 2-3 sentence spiritual interpretation of the moon phase's energy, taking hemisphere into account, with a focus on how to leverage it for manifestation."),
  ritual: z.string().describe("A short, simple manifestation ritual suggestion for this moon phase, tailored to the hemisphere and zodiac sign."),
  affirmation: z.string().describe('A short, powerful affirmation for manifestation that is related to the phase\'s energy.'),
  starsReading: z.string().describe("A 2-3 sentence reading about the influence of the current zodiac sign on the moon's energy, focusing on manifestation."),
  combinedInsight: z.string().describe("A 2-3 sentence summary that synthesizes the moon phase and the zodiac sign's influence into a single piece of actionable guidance for manifestation."),
});

export type GetMoonPhaseOutput = z.infer<typeof GetMoonPhaseOutputSchema>;

export async function getMoonPhase(input: GetMoonPhaseInput): Promise<GetMoonPhaseOutput> {
  return getMoonPhaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getMoonPhasePrompt',
  input: {schema: GetMoonPhaseInternalInputSchema},
  output: {schema: GetMoonPhaseOutputSchema},
  prompt: `You are a spiritual guide and astrologer specializing in lunar cycles and manifestation. A user has provided a date and their hemisphere to get a reading focused on manifestation.

  The date is {{{date}}}.
  The calculated moon phase is "{{{phaseName}}}".
  The moon's zodiac sign is "{{{zodiacSign}}}".
  The user is in the {{#if isNorthernHemisphere}}Northern{{else}}Southern{{/if}} Hemisphere.
  
  **Hemisphere-Specific Guidance is Crucial:**
  - In the **Northern Hemisphere**, the moon "waxes" (grows) from right to left. The energy is about building, growth, and manifestation.
  - In the **Southern Hemisphere**, the moon "waxes" (grows) from left to right. This hemisphere's traditions often associate the waxing visual with the waning energy of release, introspection, and letting go. The spiritual interpretation must be different.

  Please provide a reading structured as a valid JSON object. Do not add any conversational text. The JSON object must contain the following keys:
    -   **phaseName**: Confirm the phase name: "{{{phaseName}}}".
    -   **zodiacSign**: Confirm the zodiac sign: "{{{zodiacSign}}}".
    -   **description**: A 2-3 sentence spiritual interpretation of the energy of that phase, focused on how it impacts manifestation.
    -   **starsReading**: A 2-3 sentence reading about the influence of the zodiac sign "{{{zodiacSign}}}" on the moon's energy, specifically for manifestation.
    -   **ritual**: A simple, actionable manifestation ritual suggestion that combines the energies of both the moon phase and the zodiac sign.
    -   **affirmation**: A short, powerful manifestation-focused affirmation that aligns with the combined energy.
    -   **combinedInsight**: A 2-3 sentence summary synthesizing the moon phase and zodiac sign's influence into a single piece of actionable guidance for manifesting desires.
    -   **imageKeywords**: Provide one or two keywords for the moon phase (e.g., "full moon", "waning crescent").
  
  Return ONLY the JSON object in the specified format.`,
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
    
    const phaseIndex = Math.floor((phase * 8 + 0.5) % 8);
    const phaseName = phases[phaseIndex];
    
    // Get zodiac sign from service
    const zodiacSign = await getMoonZodiacSign(date);

    try {
        const {output} = await prompt({ date: input.date, phaseName, zodiacSign, isNorthernHemisphere: input.isNorthernHemisphere });
        if (!output) {
            throw new Error("AI output was null or undefined.");
        }
        return output;
    } catch (error) {
        console.error("AI call for moon phase failed.", error);
        // Fallback in case of error
        return {
            phaseName: phaseName,
            zodiacSign: zodiacSign,
            description: "The cosmic energies are currently veiled. Take a moment for quiet reflection. Your intuition knows the way.",
            ritual: "Light a candle and sit in silence for a few minutes. Focus on your breath and allow your mind to clear. Your inner wisdom will guide you.",
            affirmation: "I am connected to the quiet wisdom of the universe.",
            starsReading: `The moon in ${zodiacSign} encourages a gentle approach today. Listen more than you speak.`,
            combinedInsight: "Today is a day for stillness, not action. The universe invites you to rest and recharge your spiritual batteries. Clarity will come soon.",
            imageKeywords: "night sky stars"
        };
    }
  }
);
