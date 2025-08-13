
'use server';

/**
 * @fileOverview A unified AI agent for generating all data for the user dashboard with daily caching.
 *
 * - getDashboardData - A function that returns a comprehensive object with all daily readings.
 * - GetDashboardDataInput - The input type for the getDashboardData function.
 * - GetDashboardDataOutput - The return type for the getDashboardData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { customTarotDeck } from '@/lib/tarot-deck';


const GetDashboardDataInputSchema = z.object({
  date: z
    .string()
    .describe('The date to get the moon phase for, in YYYY-MM-DD format.'),
  isNorthernHemisphere: z.boolean().describe("Whether the user is in the Northern Hemisphere. This affects the visual appearance and some traditions."),
});
export type GetDashboardDataInput = z.infer<typeof GetDashboardDataInputSchema>;


const GetMoonPhaseInternalInputSchema = z.object({
  date: z.string(),
  phaseName: z.string(),
  isNorthernHemisphere: z.boolean(),
});

const TarotCardOutputSchema = z.object({
    cardName: z.string().describe('The name of the tarot card (e.g., "The Fool").'),
    orientation: z.string().describe('The orientation of the card, either "upright" or "reversed".'),
    meaning: z.string().describe("A 2-3 sentence interpretation of the card in its specific orientation."),
    affirmation: z.string().describe('A short, powerful affirmation related to the card\'s meaning.'),
    imageKeywords: z.string().describe('One or two keywords for generating an image of the card, like "tarot sun" or "tarot fool".'),
    image: z.string().describe('The path to the image for the card.'),
});


const GetDashboardDataOutputSchema = z.object({
    dailyReading: z.object({
        reading: z.string().describe('The generated spiritual reading for the day. It should be 4-6 sentences long.'),
    }),
    tarotCard: TarotCardOutputSchema,
    affirmation: z.object({
        affirmation: z.string().describe('The generated affirmation for confidence.'),
        usageTip: z.string().describe("A 1-2 sentence actionable tip on how to best use the affirmation (e.g., 'Repeat this in the mirror,' 'Write this down 5 times')."),
    }),
    angelNumber: z.object({
        number: z.string().describe('A common angel number sequence, like "333", "1111", or "1212".'),
        meaning: z.object({
            meaning: z.string().describe('The spiritual meaning of the angel number in 2-3 concise sentences for a general topic.'),
            affirmation: z.string().describe('A short, powerful affirmation related to the number\'s meaning.'),
        })
    }),
    moonPhase: z.object({
      imageKeywords: z.string().describe('One or two keywords for generating an image of this moon phase, like "new moon" or "full moon".'),
      phaseName: z.string().describe('The name of the moon phase (e.g., "New Moon", "Waxing Crescent").'),
      description: z.string().describe("A 2-3 sentence spiritual interpretation of the moon phase's energy, taking hemisphere into account."),
      ritual: z.string().describe("A short, simple ritual suggestion for this moon phase, tailored to the hemisphere."),
      affirmation: z.string().describe('A short, powerful affirmation related to the phase\'s energy.'),
    }),
});

export type GetDashboardDataOutput = z.infer<typeof GetDashboardDataOutputSchema>;

// In-memory cache for the dashboard data
let dashboardCache: { date: string; data: GetDashboardDataOutput | null } = {
  date: '',
  data: null,
};


export async function getDashboardData(input: GetDashboardDataInput): Promise<GetDashboardDataOutput> {
  const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // If we have cached data for today, return it immediately.
  if (dashboardCache.date === today && dashboardCache.data) {
    console.log('Returning cached dashboard data for', today);
    return dashboardCache.data;
  }

  console.log('Generating new dashboard data for', today);
  // Otherwise, generate new data, cache it, and return it.
  const newData = await getDashboardDataFlow(input);
  dashboardCache = {
    date: today,
    data: newData,
  };
  return newData;
}


const PromptOutputSchema = GetDashboardDataOutputSchema.omit({ tarotCard: true });


const prompt = ai.definePrompt({
  name: 'getDashboardDataPrompt',
  input: {schema: GetMoonPhaseInternalInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `You are a universal spiritual guide. A user wants a full dashboard of spiritual guidance for their day. Generate all of the following information in a single, cohesive response.

Date: {{{date}}}
Hemisphere: {{#if isNorthernHemisphere}}Northern{{else}}Southern{{/if}}

Please generate:
1.  **A Daily Reading:** A 4-6 sentence message in the style of a modern, empowering spiritual coach.
2.  **A Daily Affirmation:** Generate an affirmation for 'confidence' along with a usage tip.
3.  **A Daily Angel Number:** Provide a common angel number, its general spiritual meaning, and a related affirmation.
4.  **A Moon Phase Reading:**
    -   The calculated moon phase is "{{{phaseName}}}".
    -   Provide a hemisphere-specific spiritual interpretation (2-3 sentences), a simple ritual, and a powerful affirmation for this moon phase.
    -   Provide image keywords for the moon phase (e.g., "full moon", "waning crescent").

Return everything in the specified JSON format, except for the tarot card which will be added separately.
`,
});

const getDashboardDataFlow = ai.defineFlow(
  {
    name: 'getDashboardDataFlow',
    inputSchema: GetDashboardDataInputSchema,
    outputSchema: GetDashboardDataOutputSchema,
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

    const {output} = await prompt({ date: input.date, phaseName, isNorthernHemisphere: input.isNorthernHemisphere });

    // Manually add the tarot card to the output
    const card = customTarotDeck[Math.floor(Math.random() * customTarotDeck.length)];
    const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
    const meaning = orientation === 'upright' ? card.meaning_upright : card.meaning_reversed;

    const tarotResult = await ai.generate({
        prompt: `You are a mystical tarot reader. A user has drawn their daily card. 
  
        The card is the **${card.name} (${orientation})**.
        
        The core meaning is: "${meaning}"
        
        Based on this core meaning, provide the following:
        1.  A 2-3 sentence interpretation of this card for a daily reading.
        2.  A powerful, short affirmation related to the card's message.`,
        output: {
            schema: z.object({
                meaning: z.string(),
                affirmation: z.string(),
            }),
        }
    });

    const tarotOutput: GetDashboardDataOutput['tarotCard'] = {
        cardName: card.name,
        orientation: orientation,
        meaning: tarotResult.output!.meaning,
        affirmation: tarotResult.output!.affirmation,
        imageKeywords: card.imageKeywords,
        image: card.image,
    };
    
    return {
      ...output!,
      tarotCard: tarotOutput
    };
  }
);
