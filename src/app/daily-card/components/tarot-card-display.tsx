'use client';
import { useState, useTransition } from 'react';
import { drawTarotCard, type DrawTarotCardOutput } from '@/ai/flows/draw-tarot-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function TarotCardDisplay() {
  const [result, setResult] = useState<DrawTarotCardOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDrawCard = () => {
    startTransition(async () => {
      try {
        const cardResult = await drawTarotCard();
        setResult(cardResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not draw a card. The spirits may be busy. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  if (!result && !isPending) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
        <Sparkles className="w-16 h-16 text-primary/50 mb-4" />
        <h2 className="text-2xl font-headline text-foreground/90 mb-2">Ready to receive your message?</h2>
        <p className="text-foreground/70 mb-6">Click the button below to draw your daily tarot card.</p>
        <Button onClick={handleDrawCard} size="lg" className="h-14 text-lg px-8">
            <Wand2 className="mr-3 h-6 w-6" />
            Draw a Card
        </Button>
      </div>
    );
  }

  if (isPending) {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
            <Loader2 className="w-16 h-16 text-primary/80 animate-spin mb-4" />
            <h2 className="text-2xl font-headline text-foreground/90 mb-2">Shuffling the Deck...</h2>
            <p className="text-foreground/70">The universe is selecting your card.</p>
        </div>
    )
  }

  if (result) {
    return (
        <div className="w-full">
            <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
                <div className="md:flex md:flex-row">
                    <div className="md:w-1/3 p-6 flex flex-col items-center justify-center">
                        <Image
                            src={`https://placehold.co/400x600.png`}
                            data-ai-hint={result.imageKeywords}
                            alt={result.cardName}
                            width={400}
                            height={600}
                            className="rounded-lg shadow-2xl shadow-primary/20 aspect-[2/3] object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-4xl font-headline text-primary">
                                {result.cardName}
                            </CardTitle>
                            <CardDescription className="text-lg font-semibold text-foreground/80">
                                ({result.orientation})
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-base text-foreground/90">
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Meaning</h3>
                                <p>{result.meaning}</p>
                            </div>
                             <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Affirmation</h3>
                                <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                                    &quot;{result.affirmation}&quot;
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button onClick={handleDrawCard} variant="outline">
                                Draw Another Card
                            </Button>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    )
  }

  return null;
}
