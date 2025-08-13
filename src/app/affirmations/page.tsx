import { AppShell } from '@/components/goddess-manifest/app-shell';
import { DailyAffirmations } from './components/affirmation-generator';

export default function AffirmationsPage() {
  return (
    <AppShell title="Daily Affirmations">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Today's Affirmations</h1>
            <p className="text-foreground/80">
            A collection of daily affirmations to align your energy and focus your intent.
            </p>
        </div>
        <DailyAffirmations />
      </div>
    </AppShell>
  );
}
