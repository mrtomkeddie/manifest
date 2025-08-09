import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function DailyCardPage() {
  return (
    <AppShell title="Daily Card">
      <Card className="w-full text-center bg-card/50">
        <CardHeader className="items-center">
          <Sparkles className="w-12 h-12 text-primary/80 mb-4" />
          <CardTitle className="text-3xl font-headline">Feature Coming Soon</CardTitle>
          <CardDescription className="text-lg">The Daily Card draw is being perfected.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">
            Soon, you'll be able to start your day with a special tarot card drawn just for you, offering guidance and inspiration. We're polishing the deck and infusing it with magic. Thank you for your patience! ✨
          </p>
          <Button variant="link" className="mt-4 text-primary">Notify Me When It's Ready</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
