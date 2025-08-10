import { AppShell } from '@/components/goddess-manifest/app-shell';
import { MoonCalendar } from './components/moon-calendar';

export default function MoonCalendarPage() {
  return (
    <AppShell title="Moon & Stars">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Align with the Cosmos</h1>
            <p className="text-foreground/80">
              Discover the moon's current phase and how to harness its potent energy. Select a date to explore the lunar cycle.
            </p>
        </div>
        <MoonCalendar />
      </div>
    </AppShell>
  );
}
