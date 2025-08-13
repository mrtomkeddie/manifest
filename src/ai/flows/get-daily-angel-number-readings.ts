
'use server';

/**
 * @fileOverview An AI agent for generating a set of daily angel number readings for various topics.
 *
 * - getDailyAngelNumberReadings - A function that returns readings for the daily angel number across various categories.
 * - AngelNumberReading - The type for a single reading object.
 * - DailyAngelNumberReadingsOutput - The return type for the getDailyAngelNumberReadings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getDailyAngelNumber } from './get-daily-angel-number';
import { getAngelNumberMeaning, type AngelNumberOutput } from './get-angel-number-meaning';

const readingTopics = ['General', 'Love', 'Career', 'Finances', 'Spiritual Growth'];

const AngelNumberReadingSchema = z.object({
  topic: z.string().describe('The topic of the reading (e.g., Love, Career).'),
  meaning: z.string().describe('The spiritual meaning of the angel number in 2-3 concise sentences for this topic.'),
  affirmation: z.string().describe('A short, powerful affirmation related to the number\'s meaning for this topic.'),
});
export type AngelNumberReading = z.infer<typeof AngelNumberReadingSchema>;

const DailyAngelNumberReadingsOutputSchema = z.object({
    number: z.string().describe("The daily angel number."),
    readings: z.array(AngelNumberReadingSchema).describe("An array of readings for the angel number, one for each topic."),
});
export type DailyAngelNumberReadingsOutput = z.infer<typeof DailyAngelNumberReadingsOutputSchema>;

// Caching logic
let readingsCache: { date: string; data: DailyAngelNumberReadingsOutput | null } = {
  date: '',
  data: null,
};

export async function getDailyAngelNumberReadings(): Promise<DailyAngelNumberReadingsOutput> {
  const today = new Date().toISOString().split('T')[0];

  if (readingsCache.date === today && readingsCache.data) {
    console.log('Returning cached daily angel number readings for', today);
    return readingsCache.data;
  }
  
  console.log('Generating new daily angel number readings for', today);
  const newData = await getDailyAngelNumberReadingsFlow();
  readingsCache = {
    date: today,
    data: newData,
  };
  return newData;
}


const getDailyAngelNumberReadingsFlow = ai.defineFlow(
  {
    name: 'getDailyAngelNumberReadingsFlow',
    outputSchema: DailyAngelNumberReadingsOutputSchema,
  },
  async () => {
    // 1. Get the single daily angel number.
    const { number } = await getDailyAngelNumber();

    // 2. Create a promise for each topic to get its meaning.
    const readingPromises = readingTopics.map(topic => 
        getAngelNumberMeaning({ number, topic }).then(result => ({
            topic,
            meaning: result.meaning,
            affirmation: result.affirmation
        }))
    );
    
    // 3. Run all promises in parallel.
    const readings = await Promise.all(readingPromises);

    return {
        number,
        readings
    };
  }
);
