
import { drawTarotCard } from '@/ai/flows/draw-tarot-card';
import { generateAffirmation } from '@/ai/flows/generate-affirmation';
import { getDailyAngelNumber } from '@/ai/flows/get-daily-angel-number';
import { getAngelNumberMeaning } from '@/ai/flows/get-angel-number-meaning';
import { getDailyReading } from '@/ai/flows/get-daily-reading';
import { getMoonPhase } from '@/ai/flows/get-moon-phase';
import { format } from 'date-fns';
import { DailyReadingCard } from './daily-reading-card';
import { TodaysMoonPhaseCard } from './todays-moon-phase-card';
import { TarotCard } from './tarot-card';
import { TodaysAffirmationCard } from './todays-affirmation-card';
import { TodaysAngelNumberCard } from './todays-angel-number-card';

export async function Dashboard() {
  const dailyReadingPromise = getDailyReading();
  const todaysCardPromise = drawTarotCard();
  const todaysAffirmationPromise = generateAffirmation({ category: 'confidence' });
  const dailyAngelNumberPromise = getDailyAngelNumber();
  const moonPhasePromise = getMoonPhase({ date: format(new Date(), 'yyyy-MM-dd'), isNorthernHemisphere: true });

  const [
    dailyReading,
    todaysCard,
    todaysAffirmation,
    dailyAngelNumberResponse,
    moonPhase,
  ] = await Promise.all([
    dailyReadingPromise,
    todaysCardPromise,
    todaysAffirmationPromise,
    dailyAngelNumberPromise,
    moonPhasePromise,
  ]);
  
  const todaysAngelNumberMeaning = await getAngelNumberMeaning({ number: dailyAngelNumberResponse.number, topic: 'General' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:col-span-2">
        <DailyReadingCard reading={dailyReading.reading} />
      </div>
      <div className="lg:col-span-2">
        <TodaysMoonPhaseCard moonPhase={moonPhase} />
      </div>
      <TarotCard card={todaysCard} />
      <TodaysAngelNumberCard number={dailyAngelNumberResponse.number} meaning={todaysAngelNumberMeaning} />
      <div className="lg:col-span-2">
        <TodaysAffirmationCard affirmation={todaysAffirmation.affirmation} />
      </div>
    </div>
  );
}
