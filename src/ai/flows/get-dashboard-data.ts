
'use server';

/**
 * @fileOverview A unified AI agent for generating all data for the user dashboard.
 *
 * - getDashboardData - A function that returns a comprehensive object with all daily readings.
 * - GetDashboardDataInput - The input type for the getDashboardData function.
 * - GetDashboardDataOutput - The return type for the getDashboardData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { customTarotDeck } from '@/lib/tarot-deck';
import { getMoonZodiacSign } from '@/services/astrology-service';
import { getDailyReading } from './get-daily-reading';
import { generateAffirmation } from './generate-affirmation';
import { getDailyAngelNumber } from './get-daily-angel-number';
import { getAngelNumberMeaning } from './get-angel-number-meaning';
import { getMoonPhase } from './get-moon-phase';


const GetDashboardDataInputSchema = z.object({
  date: z
    .string()
    .describe('The date to get the moon phase for, in YYYY-MM-DD format.'),
  isNorthernHemisphere: z.boolean().describe("Whether the user is in the Northern Hemisphere. This affects the visual appearance and some traditions."),
});
export type GetDashboardDataInput = z.infer<typeof GetDashboardDataInputSchema>;


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
      zodiacSign: z.string().describe('The zodiac sign the moon is currently in.'),
      description: z.string().describe("A 2-3 sentence spiritual interpretation of the moon's energy based on its phase, sign, and hemisphere."),
    }),
});

export type GetDashboardDataOutput = z.infer<typeof GetDashboardDataOutputSchema>;


// Caching logic remains the same
let dashboardCache: { date: string; data: GetDashboardDataOutput | null } = {
  date: '',
  data: null,
};


export async function getDashboardData(input: GetDashboardDataInput): Promise<GetDashboardDataOutput> {
  const today = new Date().toISOString().split('T')[0];

  if (dashboardCache.date === today && dashboardCache.data) {
    console.log('Returning cached dashboard data for', today);
    return dashboardCache.data;
  }

  console.log('Generating new dashboard data for', today);
  const newData = await getDashboardDataFlow(input);
  dashboardCache = {
    date: today,
    data: newData,
  };
  return newData;
}


const getDashboardDataFlow = ai.defineFlow(
  {
    name: 'getDashboardDataFlow',
    inputSchema: GetDashboardDataInputSchema,
    outputSchema: GetDashboardDataOutputSchema,
  },
  async (input) => {
    // 1. Manually prepare tarot card data (no AI needed for this part)
    const card = customTarotDeck[Math.floor(Math.random() * customTarotDeck.length)];
    const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
    const meaning = orientation === 'upright' ? card.meaning_upright : card.meaning_reversed;

    // 2. Run all AI calls in parallel
    const [
      dailyReadingResult,
      affirmationResult,
      angelNumberResult,
      moonPhaseResult,
      tarotMeaningResult,
    ] = await Promise.all([
      getDailyReading().catch((e) => {
        console.error("Failed to get daily reading:", e);
        return { reading: "The cosmos is quiet today. Take a moment for peaceful reflection." };
      }),
      generateAffirmation({ category: 'confidence' }).catch((e) => {
        console.error("Failed to generate affirmation:", e);
        return { affirmation: "I am open to the universe's guidance.", usageTip: "Breathe deeply and trust your path." };
      }),
      getDailyAngelNumber().then(num => getAngelNumberMeaning({ number: num.number, topic: 'General' })).catch((e) => {
          console.error("Failed to get angel number:", e);
          return { number: "111", meaning: { meaning: "A sign of new beginnings and alignment. The universe is listening.", affirmation: "I am aligned with my highest purpose." } };
      }),
      getMoonPhase(input).catch((e) => {
        console.error("Failed to get moon phase:", e);
        return { phaseName: "Celestial Haze", zodiacSign: "Mystery", description: "The celestial energies are swirling today. It's a good day for introspection.", imageKeywords: "night sky", ritual: "", affirmation: "", starsReading: "", combinedInsight: "" };
      }),
      ai.generate({
          prompt: `You are a mystical tarot reader. Interpret the card **${card.name} (${orientation})** with the core meaning: "${meaning}". Provide a 2-3 sentence interpretation for a daily reading, and a powerful, short affirmation.`,
          output: {
              schema: z.object({
                  meaning: z.string(),
                  affirmation: z.string(),
              }),
          }
      }).then(res => res.output!).catch((e) => {
        console.error("Failed to get tarot meaning:", e);
        return { meaning: "The cards are veiled today, suggesting a time for quiet contemplation rather than action.", affirmation: "I trust in the unfolding of my journey." };
      }),
    ]);
    
    // Combine results into the final output shape.
    const angelNumberData = 'number' in angelNumberResult ? angelNumberResult : { number: "111", meaning: angelNumberResult };

    const tarotOutput: GetDashboardDataOutput['tarotCard'] = {
        cardName: card.name,
        orientation: orientation,
        meaning: tarotMeaningResult.meaning,
        affirmation: tarotMeaningResult.affirmation,
        imageKeywords: card.imageKeywords,
        image: card.image,
    };

    return {
      dailyReading: dailyReadingResult,
      affirmation: affirmationResult,
      angelNumber: angelNumberData,
      moonPhase: {
        phaseName: moonPhaseResult.phaseName,
        zodiacSign: moonPhaseResult.zodiacSign,
        description: moonPhaseResult.description,
        imageKeywords: moonPhaseResult.imageKeywords,
      },
      tarotCard: tarotOutput
    };
  }
);
