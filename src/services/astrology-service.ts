'use server';

/**
 * Gets the Zodiac sign for the Moon on a given date using astronomy-engine.
 * @param inputDate The date for which to get the moon's zodiac sign.
 * @returns The ZodiacSign of the moon on that date.
 */
export async function getMoonZodiacSign(inputDate?: Date): Promise<string> {
  // Dynamic import avoids Turbopack/CJS quirks during RSC bundling.
  const { EclipticLongitude, Body } = await import('astronomy-engine');

  const date = inputDate ?? new Date();
  // astronomy-engine returns ecliptic longitude in degrees [0..360)
  const lon = EclipticLongitude(Body.Moon, date);
  const normalized = ((lon % 360) + 360) % 360;

  const SIGNS = [
    'Aries','Taurus','Gemini','Cancer','Leo','Virgo',
    'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'
  ];
  const index = Math.floor(normalized / 30);
  
  return SIGNS[index];
}
