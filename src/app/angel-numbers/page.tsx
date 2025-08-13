
import { AppShell } from '@/components/goddess-manifest/app-shell'
import { AngelNumberLookup } from './components/angel-number-lookup'
import { getDailyAngelNumber } from '@/ai/flows/get-daily-angel-number'

export default async function AngelNumbersPage() {
  const { number } = await getDailyAngelNumber();

  return (
    <AppShell title="Angel Numbers">
      <div className="flex flex-col w-full gap-12">
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-headline text-primary mb-2">Today's Angel Number is <span className="tracking-widest">{number}</span></h1>
          <p className="text-foreground/80">
            This is the universe's message for you today. Select a topic below to see how it applies to different areas of your life, or enter any number sequence to decode its meaning.
          </p>
        </div>

        <AngelNumberLookup dailyNumber={number} />
      </div>
    </AppShell>
  )
}
