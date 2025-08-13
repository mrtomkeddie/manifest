import { AppShell } from '@/components/goddess-manifest/app-shell'
import { AngelNumberLookup } from './components/angel-number-lookup'
import { DailyAngelNumberReadings } from './components/daily-angel-number-readings'
import { Separator } from '@/components/ui/separator'

export default function AngelNumbersPage() {
  return (
    <AppShell title="Angel Numbers">
      <div className="flex flex-col w-full gap-12">
        
        <DailyAngelNumberReadings />

        <Separator className="my-4 bg-primary/20" />

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline text-primary mb-2">Decode Your Signs</h2>
          <p className="text-foreground/80">
            Are you seeing other repeating numbers? Enter a sequence below to uncover the universe's message for you.
          </p>
        </div>

        <AngelNumberLookup />
      </div>
    </AppShell>
  )
}
