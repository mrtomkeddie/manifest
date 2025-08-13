
'use server';

/**
 * @fileOverview An AI agent for generating a personalized natal chart reading based on Sun and Moon signs.
 *
 * - getNatalChartReading - A function that returns a reading for a given sign combination.
 * - GetNatalChartReadingInput - The input type for the getNatalChartReading function.
 * - GetNatalChartReadingOutput - The return type for the getNatalChartReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetNatalChartReadingInputSchema = z.object({
  sunSign: z
    .string()
    .describe('The user\'s Sun sign (e.g., "Aries", "Taurus").'),
  moonSign: z
    .string()
    .describe('The user\'s Moon sign (e.g., "Aries", "Taurus").'),
});
export type GetNatalChartReadingInput = z.infer<typeof GetNatalChartReadingInputSchema>;

const GetNatalChartReadingOutputSchema = z.object({
    headline: z.string().describe("A catchy, empowering headline for the reading, like 'The Visionary Pioneer' or 'The Nurturing Diplomat'."),
    sunSignInterpretation: z.string().describe("A 2-3 sentence interpretation of the Sun sign's influence on the user's core identity, ego, and life force. Use mystical and empowering language."),
    moonSignInterpretation: z.string().describe("A 2-3 sentence interpretation of the Moon sign's influence on the user's emotional world, intuition, and inner self. Use mystical and empowering language."),
    combinedInterpretation: z.string().describe("A 3-4 sentence synthesis of how the Sun and Moon signs interact, explaining the core dynamic of their personality. Offer guidance on how to balance these energies for manifestation and personal growth."),
});
export type GetNatalChartReadingOutput = z.infer<typeof GetNatalChartReadingOutputSchema>;

export async function getNatalChartReading(input: GetNatalChartReadingInput): Promise<GetNatalChartReadingOutput> {
  return getNatalChartReadingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getNatalChartReadingPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: GetNatalChartReadingInputSchema},
  output: {schema: GetNatalChartReadingOutputSchema},
  prompt: `You are a master astrologer, weaving mystical insights into empowering guidance. A user wants to understand their core cosmic blueprint based on their Sun and Moon signs.

  The user's Sun sign is **{{{sunSign}}}**. This represents their core essence, ego, and life force.
  The user's Moon sign is **{{{moonSign}}}**. This governs their emotional landscape, intuition, and inner world.

  Please provide the following in a JSON object:
  1.  **headline**: A catchy, empowering title for this Sun/Moon combination (e.g., "The Driven Nurturer," "The Charismatic Innovator").
  2.  **sunSignInterpretation**: A 2-3 sentence mystical interpretation of their Sun sign's influence on their core identity.
  3.  **moonSignInterpretation**: A 2-3 sentence mystical interpretation of their Moon sign's influence on their emotional world.
  4.  **combinedInterpretation**: A 3-4 sentence synthesis of how these two powerful energies interact. Explain their core inner dynamic and offer guidance on how to harness this unique combination for **personal growth and manifestation**.

  Your tone should be wise, magical, and deeply empowering. Do not add any conversational text.`,
});

const getNatalChartReadingFlow = ai.defineFlow(
  {
    name: 'getNatalChartReadingFlow',
    inputSchema: GetNatalChartReadingInputSchema,
    outputSchema: GetNatalChartReadingOutputSchema,
  },
  async input => {
    try {
        const {output} = await prompt(input);
        if (!output) {
            throw new Error("AI output was null or undefined.");
        }
        return output;
    } catch (error) {
        console.error("AI call for natal chart reading failed.", error);
        // Fallback in case of error
        return {
            headline: "The Resilient Spirit",
            sunSignInterpretation: "Your Sun in " + input.sunSign + " marks you as a natural leader, radiating a powerful life force. You are here to shine your unique light brightly upon the world.",
            moonSignInterpretation: "Your Moon in " + input.moonSign + " gives you a deep and intuitive emotional world. Your feelings are your compass, guiding you with profound wisdom.",
            combinedInterpretation: "The energies of your Sun and Moon are currently in a cosmic dance. Today is a day for introspection. Listen to the quiet whispers of your heart, for they hold the key to your path forward. Trust in the unfolding of your journey."
        };
    }
  }
);
