import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Journal } from './components/journal';

export default function JournalPage() {
  return (
    <AppShell title="My Journal">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Sacred Space</h1>
            <p className="text-foreground/80">
              Record your thoughts, dreams, and reflections. Your entries are saved securely in your browser.
            </p>
        </div>
        <Journal />
      </div>
    </AppShell>
  );
}
