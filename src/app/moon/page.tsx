import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon } from 'lucide-react';

export default function MoonCalendarPage() {
  return (
    <AppShell title="Moon Calendar">
       <Card className="w-full text-center bg-card/50">
        <CardHeader className="items-center">
          <Moon className="w-12 h-12 text-primary/80 mb-4" />
          <CardTitle className="text-3xl font-headline">Feature Coming Soon</CardTitle>
          <CardDescription className="text-lg">The Moon Calendar is charting its course.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">
            Get ready to align your life with the magical cycles of the moon. Our interactive calendar with daily rituals and insights is currently under cosmic construction. Stay tuned for its luminous debut!
          </p>
          <Button variant="link" className="mt-4 text-primary">Keep Me Updated</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
