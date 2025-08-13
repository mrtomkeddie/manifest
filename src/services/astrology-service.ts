
'use server';

/**
 * @fileOverview A service for astrological calculations using astronomy-engine.
 */

import { Body, EclipticLongitude } from 'astronomy-engine';

const SIGNS = [
    'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
    'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'
];

function getZodiacSign(body: number, date: Date): string {
  // astronomy-engine returns ecliptic longitude in degrees [0..360)
  const lon = EclipticLongitude(body, date);
  const normalized = ((lon % 360) + 360) % 360;

  const index = Math.floor(normalized / 30);
  
  return SIGNS[index];
}


/**
 * Gets the Zodiac sign for the Moon on a given date using astronomy-engine.
 * @param inputDate The date for which to get the moon's zodiac sign.
 * @returns The ZodiacSign of the moon on that date.
 */
export async function getMoonZodiacSign(inputDate?: Date): Promise<string> {
  const { Body } = await import('astronomy-engine');
  const date = inputDate ?? new Date();
  return getZodiacSign(Body.Moon, date);
}

/**
 * Gets the Zodiac sign for the Sun on a given date using astronomy-engine.
 * @param inputDate The date for which to get the sun's zodiac sign.
 * @returns The ZodiacSign of the sun on that date.
 */
export async function getSunSign(inputDate?: Date): Promise<string> {
    const { Body } = await import('astronomy-engine');
    const date = inputDate ?? new Date();
    return getZodiacSign(Body.Sun, date);
}
