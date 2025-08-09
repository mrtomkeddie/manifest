import { AppShell } from '@/components/goddess-manifest/app-shell';
import { TarotCardDisplay } from './components/tarot-card-display';

export default function DailyCardPage() {
  return (
    <AppShell title="Daily Card">
      <div className="flex flex-col w-full">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Daily Guidance</h1>
            <p className="max-w-3xl mx-auto text-foreground/80">
              Take a deep breath and center yourself. When you're ready, draw a card to receive the insight and wisdom you need for the day ahead.
            </p>
        </div>
        <TarotCardDisplay />
      </div>
    </AppShell>
  );
}
