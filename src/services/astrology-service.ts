
'use server';
import { EphemerisApi, MOON, type ZodiacSign, type EphemerisData } from 'ephemeris';

/**
 * Gets the Zodiac sign for the Moon on a given date.
 * @param date The date for which to get the moon's zodiac sign.
 * @returns The ZodiacSign of the moon on that date.
 */
export async function getMoonZodiacSign(date: Date): Promise<ZodiacSign> {
    try {
        const data: EphemerisData[] = await EphemerisApi.getPlanets(date, [MOON]);
        if (data && data.length > 0 && data[0].planets[MOON]) {
            return data[0].planets[MOON].sign;
        }
        throw new Error('Could not retrieve moon sign data.');
    } catch (error) {
        console.error("Error fetching moon zodiac sign:", error);
        // Fallback or re-throw, depending on desired behavior
        throw new Error('Failed to get astrological data.');
    }
}
