
'use server';

/**
 * @fileOverview An AI agent for providing a comprehensive daily angel number reading across multiple topics.
 *
 * - getDailyAngelNumberReadings - A function that returns readings for the day's angel number.
 * - DailyAngelNumberReadingsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getDailyAngelNumber } from './get-daily-angel-number';
import { getAngelNumberMeaning, type AngelNumberOutput } from './get-angel-number-meaning';


export type DailyAngelNumberReadingsOutput = AngelNumberOutput & { number: string };

const allTopics = ['General', 'Love', 'Career', 'Finances', 'Spiritual Growth', 'Personal Development'];

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
    outputSchema: z.object({
        number: z.string(),
        readings: z.array(z.object({
            topic: z.string(),
            meaning: z.string(),
            affirmation: z.string(),
        })),
    }),
  },
  async () => {
    // 1. Get the deterministic daily number (no AI call)
    const { number } = await getDailyAngelNumber();

    // 2. Get the meanings for all topics in a single AI call
    const { readings } = await getAngelNumberMeaning({ number, topics: allTopics });

    return { number, readings };
  }
);
