
import { getDailyReading } from '@/ai/flows/get-daily-reading';
import { drawTarotCard } from '@/ai/flows/draw-tarot-card';
import { getDailyAngelNumber } from '@/ai/flows/get-daily-angel-number';
import { getAngelNumberMeaning } from '@/ai/flows/get-angel-number-meaning';
import { getMoonPhase } from '@/ai/flows/get-moon-phase';
import { generateAffirmation } from '@/ai/flows/generate-affirmation';
import { format } from 'date-fns';
import { DailyReadingCard } from './daily-reading-card';
import { TarotCard } from './tarot-card';
import { TodaysAngelNumberCard } from './todays-angel-number-card';
import { TodaysMoonPhaseCard } from './todays-moon-phase-card';
import { TodaysAffirmationCard } from './todays-affirmation-card';

const affirmationCategories = ['Love', 'Confidence', 'Abundance', 'Calm', 'Health', 'Success'];

export async function Dashboard() {
  const dailyReadingPromise = getDailyReading();
  const tarotCardPromise = drawTarotCard();
  const dailyAngelNumberPromise = getDailyAngelNumber();
  const moonPhasePromise = getMoonPhase({ date: format(new Date(), 'yyyy-MM-dd'), isNorthernHemisphere: true });
  
  const randomCategory = affirmationCategories[Math.floor(Math.random() * affirmationCategories.length)].toLowerCase();
  const affirmationPromise = generateAffirmation({ category: randomCategory });

  const [
    dailyReading,
    tarotCard,
    dailyAngelNumber,
    moonPhase,
    affirmation
  ] = await Promise.all([
    dailyReadingPromise,
    tarotCardPromise,
    dailyAngelNumberPromise,
    moonPhasePromise,
    affirmationPromise
  ]);
  
  const angelNumberMeaning = await getAngelNumberMeaning({ number: dailyAngelNumber.number });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:col-span-2">
        <DailyReadingCard reading={dailyReading.reading} />
      </div>
      <TarotCard card={tarotCard} />
      <TodaysAngelNumberCard number={dailyAngelNumber.number} meaning={angelNumberMeaning} />
      <div className="lg:col-span-2">
        <TodaysMoonPhaseCard moonPhase={moonPhase} />
      </div>
       <div className="lg:col-span-2">
        <TodaysAffirmationCard affirmation={affirmation.affirmation} />
      </div>
    </div>
  );
}
