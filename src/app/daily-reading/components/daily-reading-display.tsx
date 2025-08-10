'use client';
import { useState, useTransition } from 'react';
import { getDailyReading, type DailyReadingOutput } from '@/ai/flows/get-daily-reading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

export function DailyReadingDisplay() {
  const [result, setResult] = useState<DailyReadingOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateReading = () => {
    startTransition(async () => {
      setResult(null);
      try {
        const readingResult = await getDailyReading();
        setResult(readingResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not retrieve your reading. The cosmos may be recalibrating. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  if (isPending) {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
            <Loader2 className="w-16 h-16 text-primary/80 animate-spin mb-4" />
            <h2 className="text-2xl font-headline text-foreground/90 mb-2">Receiving Divine Transmission...</h2>
            <p className="text-foreground/70">The universe is crafting a message just for you.</p>
        </div>
    )
  }

  if (result) {
    return (
        <div className="w-full flex flex-col items-center gap-8">
            <Card className="w-full max-w-3xl bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
                <CardContent className="p-8">
                    <p className="text-lg md:text-xl font-body text-center leading-relaxed text-foreground/90 whitespace-pre-wrap">
                        {result.reading}
                    </p>
                </CardContent>
            </Card>
            <Button onClick={handleGenerateReading} size="lg" variant="outline">
                <Wand2 className="mr-3 h-5 w-5" />
                Receive Another Message
            </Button>
        </div>
    )
  }


  return (
    <div className="w-full flex flex-col items-center justify-center text-center min-h-[300px]">
      <Sparkles className="w-16 h-16 text-primary/50 mb-4" />
      <h2 className="text-2xl font-headline text-foreground/90 mb-2">Are you open to receive?</h2>
      <p className="text-foreground/70 mb-6 max-w-xl">Your daily dose of spiritual guidance is waiting. Click the button when you're ready to connect.</p>
      <Button onClick={handleGenerateReading} size="lg" className="h-14 text-lg px-8">
          <Wand2 className="mr-3 h-6 w-6" />
          Generate My Reading
      </Button>
    </div>
  );
}
