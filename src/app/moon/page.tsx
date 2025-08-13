import { AppShell } from '@/components/goddess-manifest/app-shell';
import { MoonCalendar } from './components/moon-calendar';

export default function MoonCalendarPage() {
  return (
    <AppShell title="Moon Phase Calendar">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Align with the Cosmos</h1>
            <p className="text-foreground/80 max-w-4xl mx-auto">
              Select a date to get a detailed reading on the moon's phase and astrological sign. Each day holds a unique energy signature to work with.
            </p>
        </div>
        <MoonCalendar />
      </div>
    </AppShell>
  );
}
