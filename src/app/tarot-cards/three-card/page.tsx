
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { ThreeCardDisplay } from './components/three-card-display';

export default function ThreeCardPage() {
  return (
    <AppShell title="3-Card Reading">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Your 3-Card Reading</h1>
            <p className="text-foreground/80">
              A simple yet powerful reading for quick insight. Focus on a situation to understand its past, present, and potential future.
            </p>
        </div>
        <ThreeCardDisplay />
      </div>
    </AppShell>
  );
}
