import { AppShell } from '@/components/goddess-manifest/app-shell';
import { AngelNumberLookup } from './components/angel-number-lookup';

export default function AngelNumbersPage() {
  return (
    <AppShell title="Angel Numbers">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Decode the Signs</h1>
            <p className="text-foreground/80">
              Are you seeing repeating numbers? Enter the sequence below to uncover the universe's message for you.
            </p>
        </div>
        <AngelNumberLookup />
      </div>
    </AppShell>
  );
}
