
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { HoroscopeDisplay } from './components/horoscope-display';

export default function AstrologyPage() {
  return (
    <AppShell title="Astrology">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Cosmic Blueprint</h1>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              Discover the core of your being. Enter your birth details to uncover your Sun, Moon, and Rising sign placements.
            </p>
        </div>
        <HoroscopeDisplay />
      </div>
    </AppShell>
  );
}
