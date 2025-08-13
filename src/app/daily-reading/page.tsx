
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { DailyReading } from './components/daily-reading';

export default function DailyReadingPage() {
  return (
    <AppShell title="Daily Reading">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Daily Briefing</h1>
            <p className="text-foreground/80">
              A summary of today's cosmic energy. Use this as a guide for your day.
            </p>
        </div>
        <DailyReading />
      </div>
    </AppShell>
  );
}
