'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/generate-affirmation.ts';
import '@/ai/flows/draw-tarot-card.ts';
import '@/ai/flows/get-angel-number-meaning.ts';
import '@/ai/flows/get-moon-phase.ts';
import '@/ai/flows/get-daily-angel-number.ts';
import '@/ai/flows/get-daily-reading.ts';
import '@/ai/flows/celtic-cross-reading.ts';
import '@/ai/flows/three-card-reading.ts';
import '@/ai/flows/get-daily-horoscope.ts';
import '@/ai/flows/get-dashboard-data.ts';
import '@/ai/flows/get-daily-affirmations.ts';
import '@/ai/flows/get-daily-angel-number-readings.ts';
