
'use client';
import { useState, useTransition } from 'react';
import { getAngelNumberMeaning, type AngelNumberOutput } from '@/ai/flows/get-angel-number-meaning';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AngelNumberLookup() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<AngelNumberOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLookup = () => {
    if (!number) {
        toast({
            title: 'No number entered',
            description: 'Please enter a number sequence to look up.',
            variant: 'destructive',
        });
        return;
    }
    startTransition(async () => {
      setResult(null);
      try {
        const meaningResult = await getAngelNumberMeaning({ number });
        setResult(meaningResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not find the meaning. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLookup();
    }
  }

  return (
    <div className="w-full">
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g., 444, 1111, 222..."
                    className="h-12 text-base"
                    disabled={isPending}
                />
                <Button onClick={handleLookup} disabled={isPending} className="h-12 text-base w-full md:w-auto">
                    {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                    <Search className="mr-2 h-5 w-5" />
                    )}
                    {isPending ? 'Searching...' : 'Find Meaning'}
                </Button>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
            {isPending && (
                <div className="flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
                    <h2 className="text-xl font-headline text-foreground/90 mb-2">Consulting the Cosmos...</h2>
                    <p className="text-foreground/70">Uncovering the hidden message in your number.</p>
                </div>
            )}
            {!isPending && result && (
                <div className="space-y-8 text-base text-center text-foreground/90 animate-in fade-in duration-500 w-full">
                    <h2 className="text-6xl font-headline text-primary tracking-widest">{number}</h2>
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
                </div>
            )}
            {!isPending && !result && (
                <div className="text-center text-foreground/60 w-full py-12">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary/50" />
                    <p>The universe's guidance will appear here.</p>
                </div>
            )}
        </CardContent>
        </Card>
    </div>
  );
}
