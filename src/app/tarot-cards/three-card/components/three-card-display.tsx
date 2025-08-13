'use client';
import { useState, useTransition } from 'react';
import { threeCardReading, type ThreeCardReadingOutput } from '@/ai/flows/three-card-reading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Sparkles, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const topics = ['General', 'Love', 'Career', 'Finances', 'Spiritual Growth', 'Personal Development'];

export function ThreeCardDisplay() {
  const [result, setResult] = useState<ThreeCardReadingOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [topic, setTopic] = useState(topics[0]);
  const { toast } = useToast();

  const handleDrawCards = () => {
    startTransition(async () => {
      setResult(null);
      try {
        const cardResult = await threeCardReading({ topic });
        setResult(cardResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not perform the reading. The spirits may be busy. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  if (!result && !isPending) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center min-h-[400px] space-y-6">
        <Sparkles className="w-16 h-16 text-primary/50" />
        <h2 className="text-2xl font-headline text-foreground/90">Ready for a quick insight?</h2>
        <p className="text-foreground/70">Select an area of your life you'd like to focus on for your Past, Present, and Future reading.</p>
        
        <div className="w-full space-y-4">
            <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                    {topics.map((t) => (
                        <SelectItem key={t} value={t}>
                        {t}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button onClick={handleDrawCards} size="lg" className="h-14 text-lg px-8 w-full">
                <Wand2 className="mr-3 h-6 w-6" />
                Begin Reading
            </Button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
            <Loader2 className="w-16 h-16 text-primary/80 animate-spin mb-4" />
            <h2 className="text-2xl font-headline text-foreground/90 mb-2">Shuffling the Deck...</h2>
            <p className="text-foreground/70">The universe is selecting your cards.</p>
        </div>
    )
  }

  if (result) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2 text-3xl font-headline text-primary">
                        <BookOpen />
                        Your Reading's Summary
                    </CardTitle>
                    <CardDescription>An overview of the spiritual guidance for your chosen topic: <span className="font-semibold text-primary/90">{topic}</span></CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-foreground/90 text-center leading-relaxed">{result.summary}</p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8">
                {result.cards.map((card) => (
                    <Card key={card.positionName} className="bg-card/50 border-primary/10">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-center text-primary">{card.positionName}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                            <Image
                                src={card.image}
                                alt={card.cardName}
                                width={200}
                                height={300}
                                className="rounded-lg shadow-lg shadow-primary/10 aspect-[2/3] object-cover"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-headline text-foreground/90">
                                    {card.cardName}
                                </h3>
                                <p className="text-sm font-sans text-foreground/70">({card.orientation})</p>
                            </div>
                            <p className="text-foreground/80 text-sm text-center">{card.meaning}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center pt-8">
                <Button onClick={() => setResult(null)} variant="outline" size="lg">
                    Perform a New Reading
                </Button>
            </div>
        </div>
    )
  }

  return null;
}
