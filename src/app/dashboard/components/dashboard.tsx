
import { format } from 'date-fns';
import { DailyReadingCard } from './daily-reading-card';
import { TodaysMoonPhaseCard } from './todays-moon-phase-card';
import { TarotCard } from './tarot-card';
import { TodaysAffirmationCard } from './todays-affirmation-card';
import { TodaysAngelNumberCard } from './todays-angel-number-card';
import { getDashboardData } from '@/ai/flows/get-dashboard-data';
import { TodaysHoroscopeCard } from './todays-horoscope-card';

export async function Dashboard() {
  const dashboardData = await getDashboardData({ date: format(new Date(), 'yyyy-MM-dd'), isNorthernHemisphere: true });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:col-span-2">
        <DailyReadingCard reading={dashboardData.dailyReading.reading} />
      </div>
       <div className="lg:col-span-2">
        <TodaysHoroscopeCard />
      </div>
      <div className="lg:col-span-2">
        <TodaysMoonPhaseCard moonPhase={dashboardData.moonPhase} />
      </div>
      <TarotCard card={dashboardData.tarotCard} />
      <TodaysAngelNumberCard number={dashboardData.angelNumber.number} meaning={dashboardData.angelNumber.meaning} />
      <div className="lg:col-span-2">
        <TodaysAffirmationCard affirmation={dashboardData.affirmation.affirmation} />
      </div>
    </div>
  );
}
