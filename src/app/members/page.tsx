
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gem, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MembersPage() {
  return (
    <AppShell title="Members Area">
       <Card className="w-full max-w-2xl mx-auto text-center bg-card/50">
        <CardHeader className="items-center">
          <Gem className="w-12 h-12 text-primary/80 mb-4" />
          <CardTitle className="text-3xl font-headline">Become a Member</CardTitle>
          <CardDescription className="text-lg">Unlock your full potential.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 mb-8">
            Join the Goddess Circle to access your private journal, save your readings, and receive exclusive content to elevate your spiritual practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login">
                  Login
              </Link>
            </Button>
             <Button asChild size="lg" variant="outline">
              <Link href="/signup">
                  Sign Up Free
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-center">
            <p className="text-sm text-foreground/70">Ready to commit to your growth?</p>
            <Button asChild variant="link">
                <Link href="/pricing">
                    View Membership Plans <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </AppShell>
  );
}
