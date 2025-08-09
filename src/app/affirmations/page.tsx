import { AppShell } from '@/components/goddess-manifest/app-shell';
import { AffirmationGenerator } from './components/affirmation-generator';

export default function AffirmationsPage() {
  return (
    <AppShell title="Affirmation Generator">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Craft Your Reality</h1>
            <p className="text-foreground/80">
            Select a category and let the universe provide the words you need to hear. Speak your affirmation with conviction and feel its power.
            </p>
        </div>
        <AffirmationGenerator />
      </div>
    </AppShell>
  );
}
