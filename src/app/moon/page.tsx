import { AppShell } from '@/components/goddess-manifest/app-shell';
import { MoonCalendar } from './components/moon-calendar';

export default function MoonCalendarPage() {
  return (
    <AppShell title="Moon & Stars">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Align with the Cosmos</h1>
            <p className="text-foreground/80 max-w-4xl mx-auto">
              Get your daily cosmic forecast by combining the moon's phase with the wisdom of the stars. You can also select your zodiac sign to get a personal horoscope for the day.
            </p>
        </div>
        <MoonCalendar />
      </div>
    </AppShell>
  );
}
