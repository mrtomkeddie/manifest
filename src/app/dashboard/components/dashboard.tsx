
import { getDailyReading } from '@/ai/flows/get-daily-reading';
import { getMoonPhase } from '@/ai/flows/get-moon-phase';
import { format } from 'date-fns';
import { DailyReadingCard } from './daily-reading-card';
import { TodaysMoonPhaseCard } from './todays-moon-phase-card';
import { TarotCardCta } from './tarot-card-cta';
import { AngelNumberCta } from './angel-number-cta';
import { AffirmationCta } from './affirmation-cta';

export async function Dashboard() {
  const dailyReadingPromise = getDailyReading();
  const moonPhasePromise = getMoonPhase({ date: format(new Date(), 'yyyy-MM-dd'), isNorthernHemisphere: true });

  const [
    dailyReading,
    moonPhase,
  ] = await Promise.all([
    dailyReadingPromise,
    moonPhasePromise,
  ]);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:col-span-2">
        <DailyReadingCard reading={dailyReading.reading} />
      </div>
      <div className="lg:col-span-2">
        <TodaysMoonPhaseCard moonPhase={moonPhase} />
      </div>
      <TarotCardCta />
      <AngelNumberCta />
      <div className="lg:col-span-2">
        <AffirmationCta />
      </div>
    </div>
  );
}
