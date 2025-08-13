
'use server';
import * as ephemeris from 'ephemeris';

/**
 * Gets the Zodiac sign for the Moon on a given date.
 * @param date The date for which to get the moon's zodiac sign.
 * @returns The ZodiacSign of the moon on that date.
 */
export async function getMoonZodiacSign(date: Date): Promise<ephemeris.ZodiacSign> {
    try {
        const data: ephemeris.EphemerisData[] = await new Promise((resolve, reject) => {
            ephemeris.getPlanets(date, [ephemeris.MOON], (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });

        if (data && data.length > 0 && data[0].planets[ephemeris.MOON]) {
            return data[0].planets[ephemeris.MOON].sign;
        }
        throw new Error('Could not retrieve moon sign data.');
    } catch (error) {
        console.error("Error fetching moon zodiac sign:", error);
        // Fallback or re-throw, depending on desired behavior
        throw new Error('Failed to get astrological data.');
    }
}
