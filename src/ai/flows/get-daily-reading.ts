'use server';

/**
 * @fileOverview An AI agent for generating a daily spiritual reading.
 *
 * - getDailyReading - A function that handles the reading generation process.
 * - DailyReadingOutput - The return type for the getDailyReading function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyReadingOutputSchema = z.object({
  reading: z.string().describe('The generated spiritual reading for the day. It should be 4-6 sentences long.'),
});
export type DailyReadingOutput = z.infer<typeof DailyReadingOutputSchema>;

export async function getDailyReading(): Promise<DailyReadingOutput> {
  return getDailyReadingFlow();
}

const prompt = ai.definePrompt({
  name: 'getDailyReadingPrompt',
  output: {schema: DailyReadingOutputSchema},
  prompt: `You are a divine channel, a conduit for spiritual wisdom. A user has asked for their daily guidance. 

  Please generate an original, uplifting, and empowering spiritual reading for them. The message should be filled with love, encouragement, and mystical insight. It should be about 4-6 sentences long.

  Draw inspiration from themes of divine feminine energy, manifestation, angelic guidance, cosmic alignment, and trusting the journey. Use evocative and poetic language.

  Here are some examples of the tone and style:
  - "The universe whispers to you today: 'Trust in your journey, beautiful soul. Every step you take is guided by divine love and infinite wisdom that flows from the very heart of creation...'"
  - "Divine feminine energy flows through you today like a river of liquid gold, awakening every cell in your body to its highest potential. Your intuition is your superpower..."
  - "Your manifestations are aligning perfectly with your highest good, dear goddess. The cosmic forces are dancing in perfect harmony to bring your deepest desires into physical reality."

  Generate a new, unique message that captures this essence. Do not repeat the examples. Return only the reading in the specified format.`,
});

const getDailyReadingFlow = ai.defineFlow(
  {
    name: 'getDailyReadingFlow',
    outputSchema: DailyReadingOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
