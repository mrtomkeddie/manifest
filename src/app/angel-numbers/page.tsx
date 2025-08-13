
import { AppShell } from '@/components/goddess-manifest/app-shell'
import { AngelNumberLookup } from './components/angel-number-lookup'
import { getDailyAngelNumber } from '@/ai/flows/get-daily-angel-number'

export default async function AngelNumbersPage() {
  const { number } = await getDailyAngelNumber();

  return (
    <AppShell title="Angel Numbers">
      <div className="flex flex-col w-full gap-12">
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-headline text-primary mb-2">Decode the Universe's Messages</h1>
          <p className="text-foreground/80">
            Today's number is <span className="font-bold text-primary tracking-widest">{number}</span>. Enter any number sequence below to receive a comprehensive reading of its spiritual significance across all areas of your life.
          </p>
        </div>

        <AngelNumberLookup dailyNumber={number} />
      </div>
    </AppShell>
  )
}
