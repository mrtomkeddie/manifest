
'use server';

/**
 * @fileOverview An AI agent for generating a set of readings for the daily angel number.
 *
 * - getDailyAngelNumberReadings - A function that returns readings for the daily angel number across various topics.
 * - DailyAngelNumberReading - The type for a single reading object.
 * - DailyAngelNumberReadingsOutput - The return type for the getDailyAngelNumberReadings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getDailyAngelNumber } from './get-daily-angel-number';
import { getAngelNumberMeaning, type AngelNumberReading } from './get-angel-number-meaning';

const readingTopics = ['Love', 'Career', 'Finances', 'Spiritual Growth', 'Personal Development'];

export type DailyAngelNumberReading = AngelNumberReading;

const DailyAngelNumberReadingsOutputSchema = z.object({
  number: z.string().describe("The angel number for the day."),
  readings: z.array(z.object({
    topic: z.string(),
    meaning: z.string(),
    affirmation: z.string(),
  })).length(readingTopics.length).describe("An array of readings, one for each topic."),
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
    // 1. Get the daily number (no AI call)
    const { number } = await getDailyAngelNumber();

    // 2. Get all meanings in a single AI call
    const { readings } = await getAngelNumberMeaning({ number, topics: readingTopics });

    return {
      number,
      readings,
    };
  }
);
