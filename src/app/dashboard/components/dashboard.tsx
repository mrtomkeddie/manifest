import { getDailyReading } from '@/ai/flows/get-daily-reading';
import { drawTarotCard } from '@/ai/flows/draw-tarot-card';
import { getDailyAngelNumber } from '@/ai/flows/get-daily-angel-number';
import { getAngelNumberMeaning } from '@/ai/flows/get-angel-number-meaning';
import { getMoonPhase } from '@/ai/flows/get-moon-phase';
import { format } from 'date-fns';
import { DailyReadingCard } from './daily-reading-card';
import { TarotCard } from './tarot-card';
import { TodaysAngelNumberCard } from './todays-angel-number-card';
import { TodaysMoonPhaseCard } from './todays-moon-phase-card';
import { AffirmationGenerator } from '@/app/affirmations/components/affirmation-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export async function Dashboard() {
  const dailyReadingPromise = getDailyReading();
  const tarotCardPromise = drawTarotCard();
  const dailyAngelNumberPromise = getDailyAngelNumber();
  const moonPhasePromise = getMoonPhase({ date: format(new Date(), 'yyyy-MM-dd'), isNorthernHemisphere: true });

  const [
    dailyReading,
    tarotCard,
    dailyAngelNumber,
    moonPhase
  ] = await Promise.all([
    dailyReadingPromise,
    tarotCardPromise,
    dailyAngelNumberPromise,
    moonPhasePromise
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
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Wand2 />
                    Affirmation Generator
                </CardTitle>
                <CardDescription>Generate a new affirmation to carry with you today.</CardDescription>
            </CardHeader>
            <CardContent>
                <AffirmationGenerator />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
