
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TarotCardsPage() {
  return (
    <AppShell title="Tarot Readings">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center">
            <h1 className="text-4xl font-headline text-primary mb-2">Choose Your Reading</h1>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              Select the type of reading that best suits your needs today. Are you looking for a quick daily insight or a deep dive into a specific situation?
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">3-Card Spread</CardTitle>
                    <CardDescription>Past, Present & Future</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <p className="text-foreground/80">
                        Get a quick, insightful overview of a situation. Perfect for daily check-ins, clarifying your current energy, and receiving straightforward guidance.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/tarot-cards/three-card">
                            Begin 3-Card Reading <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Celtic Cross</CardTitle>
                    <CardDescription>A Deep & Comprehensive Dive</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <p className="text-foreground/80">
                        A 10-card spread that explores your past, present, future, inner emotions, outside influences, and potential outcomes. Best for big questions and moments of change.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/tarot-cards/celtic-cross">
                            Begin Celtic Cross Reading <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
        
        <Card className="max-w-5xl mx-auto bg-card/40 border-primary/10">
            <CardHeader>
                <CardTitle>When to Use the Celtic Cross</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/70">
                <p>
                    The Celtic Cross is a deep, 10-card spread that explores your past, present, future, inner emotions, outside influences, and potential outcomes. It’s best for big questions and moments of change — like starting a new chapter, making a major decision, or seeking clarity on a long-term situation.
                </p>
                <p>
                    For the clearest insights, we recommend using the Celtic Cross no more than once a month for the same question or situation. For day-to-day guidance, try our 3-Card Spread instead — it's perfect for quick check-ins and daily inspiration.
                </p>
            </CardContent>
        </Card>

      </div>
    </AppShell>
  );
}
