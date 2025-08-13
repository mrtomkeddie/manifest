
'use client';
import { useState, useTransition, useEffect } from 'react';
import { getAngelNumberMeaning } from '@/ai/flows/get-angel-number-meaning';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Sparkles, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const topics = ['General', 'Love', 'Career', 'Finances', 'Spiritual Growth', 'Personal Development'];

export function AngelNumberLookup({ dailyNumber }: { dailyNumber: string }) {
  const [number, setNumber] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [displayedNumber, setDisplayedNumber] = useState('');
  const [result, setResult] = useState<{ topic: string, meaning: string, affirmation: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    // When the component mounts, set the displayed number to the daily number
    setDisplayedNumber(dailyNumber);
  }, [dailyNumber]);

  const handleLookup = (numberToLookup: string) => {
    if (!numberToLookup) {
        toast({
            title: 'No number selected',
            description: 'Please enter a number sequence or use the daily number to get a reading.',
            variant: 'destructive',
        });
        return;
    }
    startTransition(async () => {
      setResult(null);
      try {
        const meaningResult = await getAngelNumberMeaning({ number: numberToLookup, topics: [topic] });
        if (meaningResult.readings.length > 0) {
            setResult(meaningResult.readings[0]);
        }
        setDisplayedNumber(numberToLookup);
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

  const handleGetDailyReading = () => {
    setNumber(dailyNumber); // Set input to daily number
    handleLookup(dailyNumber);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLookup(number);
    }
  }

  return (
    <div className="w-full">
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                    <Input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={handleKeyDown}
                        placeholder={`Enter a number e.g. 444`}
                        className="h-12 text-base"
                        disabled={isPending}
                    />
                    <Button onClick={() => handleLookup(number)} disabled={isPending} className="h-12 text-base">
                        {isPending && number ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                        {isPending && number ? 'Searching...' : 'Find Meaning'}
                    </Button>
                </div>
                 <div className="flex-1 flex gap-2">
                    <Select value={topic} onValueChange={setTopic} disabled={isPending}>
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
                     <Button onClick={handleGetDailyReading} disabled={isPending} className="h-12 text-base w-full">
                        {isPending && !number ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Star className="mr-2 h-5 w-5" />}
                        {isPending && !number ? 'Reading...' : `Get Daily Reading`}
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center w-full gap-4">
            {isPending && (
                <div className="flex flex-col items-center justify-center text-center p-6 min-h-[200px]">
                    <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
                    <h2 className="text-xl font-headline text-foreground/90 mb-2">Consulting the Cosmos...</h2>
                    <p className="text-foreground/70">Uncovering the hidden message in your number.</p>
                </div>
            )}
            {!isPending && result && (
                <div className="w-full p-6 text-base text-center text-foreground/90 animate-in fade-in duration-500 min-h-[200px]">
                    <h2 className="text-6xl font-headline text-primary tracking-widest mb-8">{displayedNumber}</h2>
                    <div className="mb-8">
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Meaning for {topic}</h3>
                        <p>{result.meaning}</p>
                    </div>
                        <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Affirmation</h3>
                        <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                            &quot;{result.affirmation}&quot;
                        </p>
                    </div>
                </div>
            )}
            {!isPending && !result && (
                <div className="flex flex-col items-center justify-center w-full text-center text-foreground/60 p-6 gap-4 min-h-[200px]">
                    <div className="py-12">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                        <p>Select a topic and get the reading for today's number, or enter a custom number.</p>
                    </div>
                </div>
            )}
        </CardContent>
        </Card>
    </div>
  );
}
