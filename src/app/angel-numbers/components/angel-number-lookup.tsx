

'use client';
import { useState, useTransition } from 'react';
import { getAngelNumberMeaning, type AngelNumberOutput } from '@/ai/flows/get-angel-number-meaning';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

const allTopics = ['General', 'Love', 'Career', 'Finances', 'Spiritual Growth', 'Personal Development'];

export function AngelNumberLookup({ dailyNumber }: { dailyNumber: string }) {
  const [number, setNumber] = useState(dailyNumber);
  const [result, setResult] = useState<AngelNumberOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLookup = () => {
    if (!number) {
      toast({
        title: 'No number provided',
        description: 'Please enter a number sequence to get a reading.',
        variant: 'destructive',
      });
      return;
    }
    startTransition(async () => {
      setResult(null);
      try {
        const meaningResult = await getAngelNumberMeaning({ number, topics: allTopics });
        setResult(meaningResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not find the meaning. The spirits may be busy. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLookup();
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <Input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              placeholder={`Enter a number e.g. 444`}
              className="h-12 text-base"
              disabled={isPending}
            />
            <Button onClick={handleLookup} disabled={isPending} className="h-12 text-base">
              {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
              {isPending ? 'Searching...' : 'Find Meaning'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center w-full gap-4">
          {isPending && (
            <div className="flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
              <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
              <h2 className="text-xl font-headline text-foreground/90 mb-2">Consulting the Cosmos...</h2>
              <p className="text-foreground/70">Uncovering the hidden messages in your number.</p>
            </div>
          )}
          {!isPending && result && (
            <div className="w-full p-4 sm:p-6 text-base text-center text-foreground/90 animate-in fade-in duration-500 min-h-[300px] space-y-8">
              <h2 className="text-6xl font-headline text-primary tracking-widest mb-8">{number}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.readings.map((reading) => (
                  <Card key={reading.topic} className="w-full bg-background/40 p-4 text-left">
                     <CardTitle className="text-lg font-headline text-primary mb-3">{reading.topic}</CardTitle>
                     <CardContent className="p-0 space-y-4">
                        <p className="text-sm text-foreground/80">{reading.meaning}</p>
                        <div>
                            <h4 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-1">Affirmation</h4>
                             <p className="font-semibold text-sm text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                                &quot;{reading.affirmation}&quot;
                            </p>
                        </div>
                     </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {!isPending && !result && (
            <div className="flex flex-col items-center justify-center w-full text-center text-foreground/60 p-6 gap-4 min-h-[300px]">
              <div className="py-12">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                <p>Today's number is {dailyNumber}. Click "Find Meaning" to get a full reading, or enter a custom number.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
