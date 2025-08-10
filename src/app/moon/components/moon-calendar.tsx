
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getMoonPhase, type GetMoonPhaseOutput } from '@/ai/flows/get-moon-phase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Moon, Sparkles, Wand2 } from 'lucide-react';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from "@/components/ui/calendar"
import { Separator } from '@/components/ui/separator';

function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

export function MoonCalendar() {
  const [date, setDate] = useState<Date | undefined>();
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [result, setResult] = useState<GetMoonPhaseOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs once on mount to set the initial date on the client.
    setDate(new Date());
  }, []);

  const handleGetReading = () => {
    if (!date) return;
    startTransition(async () => {
      setResult(null);
      try {
        const moonResult = await getMoonPhase({ date: formatDate(date), isNorthernHemisphere });
        setResult(moonResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not fetch the moon phase. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="w-full">
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <div className="md:grid md:grid-cols-2">
                <div className="p-6 flex flex-col items-center justify-center gap-4 border-b md:border-b-0 md:border-r border-primary/10">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        className="rounded-md"
                        disabled={isPending || !date}
                        initialFocus
                    />
                    <div className="flex items-center space-x-2 pt-4">
                        <Label htmlFor="hemisphere-switch">Southern</Label>
                        <Switch
                            id="hemisphere-switch"
                            checked={isNorthernHemisphere}
                            onCheckedChange={setIsNorthernHemisphere}
                            disabled={isPending}
                        />
                        <Label htmlFor="hemisphere-switch">Northern</Label>
                    </div>
                     <Button onClick={handleGetReading} disabled={isPending || !date} className="mt-4 h-12 text-base">
                        {isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Wand2 className="mr-2 h-5 w-5" />
                        )}
                        {isPending ? 'Consulting...' : 'Get Moon Reading'}
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-center p-8 md:p-12 min-h-[400px]">
                    {isPending && (
                        <div className="flex flex-col items-center justify-center text-center p-6">
                            <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
                            <h2 className="text-xl font-headline text-foreground/90 mb-2">Reading the Stars...</h2>
                            {date && <p className="text-foreground/70">Determining the lunar energy for {format(date, 'PPP')}.</p>}
                        </div>
                    )}
                    {!isPending && result && date && (
                        <div className="w-full space-y-8 text-foreground/90 animate-in fade-in duration-500 text-center">
                            <div>
                                <h2 className="text-4xl font-headline text-primary mb-1">{result.phaseName}</h2>
                                <p className="font-semibold text-foreground/80">{format(date, 'PPP')}</p>
                            </div>
                            
                            <div className="space-y-6 text-left">
                                <div>
                                    <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2 text-center">Energy & Meaning</h3>
                                    <p className="text-foreground/80 text-center">{result.description}</p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2 text-center">Ritual</h3>
                                    <p className="text-foreground/80 text-center">{result.ritual}</p>
                                </div>
                                 <Separator />
                                <div>
                                    <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2 text-center">Astrological Influence</h3>
                                    <p className="text-foreground/80 text-center">{result.astrologicalInfluence}</p>
                                </div>
                                 <Separator />
                                <div>
                                    <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2 text-center">Manifestation Action</h3>
                                    <p className="text-foreground/80 text-center">{result.manifestationAction}</p>
                                </div>
                                 <Separator />
                                <div>
                                    <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2 text-center">Affirmation</h3>
                                    <p className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400 text-center">
                                        &quot;{result.affirmation}&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isPending && !result && (
                        <div className="text-center text-foreground/60">
                            <Moon className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                            <h2 className="text-2xl font-headline">Select a date</h2>
                            <p>Choose a date and your hemisphere to reveal the moon's guidance.</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    </div>
  );
}
