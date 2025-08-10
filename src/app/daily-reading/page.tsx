import { AppShell } from '@/components/goddess-manifest/app-shell';
import { DailyReadingDisplay } from './components/daily-reading-display';

export default function DailyReadingPage() {
  return (
    <AppShell title="Daily Reading">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">A Message from the Universe</h1>
            <p className="text-foreground/80">
              Take a moment to breathe and be present. When you feel ready, ask for guidance and click the button below to receive your daily message.
            </p>
        </div>
        <DailyReadingDisplay />
      </div>
    </AppShell>
  );
}
