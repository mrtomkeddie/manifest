import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export default function AngelNumbersPage() {
  return (
    <AppShell title="Angel Numbers">
       <Card className="w-full text-center bg-card/50">
        <CardHeader className="items-center">
          <Star className="w-12 h-12 text-primary/80 mb-4" />
          <CardTitle className="text-3xl font-headline">Feature Coming Soon</CardTitle>
          <CardDescription className="text-lg">Our Angel Numbers directory is aligning.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">
            We are currently cataloging the universe's messages. Soon you'll be able to search for any angel number and uncover its profound meaning and affirmation. The celestial library is almost open!
          </p>
          <Button variant="link" className="mt-4 text-primary">Get Notified Upon Launch</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
