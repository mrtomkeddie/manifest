
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { TarotCardDisplay } from '../components/tarot-card-display';

export default function CelticCrossPage() {
  return (
    <AppShell title="Celtic Cross Reading">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Celtic Cross Reading</h1>
            <p className="text-foreground/80">
                Take a deep breath and center yourself. Choose a focus for your reading to uncover deep insights into your life's path.
            </p>
        </div>
        <TarotCardDisplay />
      </div>
    </AppShell>
  );
}
