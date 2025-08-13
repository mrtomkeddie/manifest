
'use server';

/**
 * @fileOverview An AI agent for generating a set of daily affirmations, one for each category.
 *
 * - getDailyAffirmations - A function that returns affirmations for various categories.
 * - DailyAffirmation - The type for a single affirmation object.
 * - DailyAffirmationsOutput - The return type for the getDailyAffirmations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const affirmationCategories = ['Love', 'Confidence', 'Abundance', 'Calm', 'Health', 'Success'];

const DailyAffirmationSchema = z.object({
  category: z.string().describe('The category of the affirmation (e.g., Love, Confidence).'),
  affirmation: z.string().describe('The generated affirmation text.'),
  usageTip: z.string().describe("A 1-2 sentence actionable tip on how to best use the affirmation."),
});
export type DailyAffirmation = z.infer<typeof DailyAffirmationSchema>;

const DailyAffirmationsOutputSchema = z.object({
    affirmations: z.array(DailyAffirmationSchema).length(affirmationCategories.length).describe("An array of affirmations, one for each category."),
});
export type DailyAffirmationsOutput = z.infer<typeof DailyAffirmationsOutputSchema>;

const fallbackAffirmations: DailyAffirmationsOutput = {
    affirmations: [
        { category: 'Love', affirmation: "I am open to receiving and giving love.", usageTip: "Think of someone you love and send them this positive energy." },
        { category: 'Confidence', affirmation: "I am confident in my abilities and decisions.", usageTip: "Stand tall and repeat this to yourself before a challenging task." },
        { category: 'Abundance', affirmation: "I attract abundance and prosperity into my life.", usageTip: "Visualize your goals as already achieved." },
        { category: 'Calm', affirmation: "I am calm, centered, and at peace.", usageTip: "Take three deep breaths, repeating this with each exhale." },
        { category: 'Health', affirmation: "I am grateful for my body and its vitality.", usageTip: "Do a gentle stretch while focusing on this thought." },
        { category: 'Success', affirmation: "I am worthy of success and achieve my goals.", usageTip: "Write down one small step you can take towards a goal today." },
    ]
};


// Caching logic
let affirmationsCache: { date: string; data: DailyAffirmationsOutput | null } = {
  date: '',
  data: null,
};

export async function getDailyAffirmations(): Promise<DailyAffirmationsOutput> {
  const today = new Date().toISOString().split('T')[0];

  if (affirmationsCache.date === today && affirmationsCache.data) {
    console.log('Returning cached daily affirmations for', today);
    return affirmationsCache.data;
  }
  
  console.log('Generating new daily affirmations for', today);
  const newData = await getDailyAffirmationsFlow();
  affirmationsCache = {
    date: today,
    data: newData,
  };
  return newData;
}


const prompt = ai.definePrompt({
  name: 'getDailyAffirmationsPrompt',
  input: {schema: z.object({ categories: z.array(z.string()) })},
  output: {schema: DailyAffirmationsOutputSchema},
  prompt: `You are an affirmation generator and spiritual coach. For each category provided, please create a unique, powerful affirmation. Also provide a short, actionable tip for how the user can best integrate that specific affirmation into their day.

Return a single affirmation for each of these categories:
{{#each categories}}
- {{{this}}}
{{/each}}

Ensure the output is a valid array of objects in the specified format. Do not add any conversational text.`,
});

const getDailyAffirmationsFlow = ai.defineFlow(
  {
    name: 'getDailyAffirmationsFlow',
    outputSchema: DailyAffirmationsOutputSchema,
  },
  async () => {
    try {
        const {output} = await prompt({ categories: affirmationCategories });
        if (!output) {
            throw new Error("AI output was null or undefined.");
        }
        return output;
    } catch (error) {
        console.error("AI call for daily affirmations failed, returning fallback data.", error);
        return fallbackAffirmations;
    }
  }
);
