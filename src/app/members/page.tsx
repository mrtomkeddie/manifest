import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gem } from 'lucide-react';
import Link from 'next/link';

export default function MembersPage() {
  return (
    <AppShell title="Members Area">
       <Card className="w-full text-center bg-card/50">
        <CardHeader className="items-center">
          <Gem className="w-12 h-12 text-primary/80 mb-4" />
          <CardTitle className="text-3xl font-headline">Welcome, Goddess</CardTitle>
          <CardDescription className="text-lg">This sacred space is for members only.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mb-8">
            This is where you'll find your private journal, exclusive downloads, and links to live events. If you're not yet a member, you can unlock access and elevate your practice.
          </p>
          <Button asChild size="lg">
            <Link href="/pricing">
                View Membership Plans
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}
