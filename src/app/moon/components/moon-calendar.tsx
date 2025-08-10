
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getMoonPhase, type GetMoonPhaseOutput } from '@/ai/flows/get-moon-phase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Moon, Sparkles, Wand2, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

export function MoonCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [result, setResult] = useState<GetMoonPhaseOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
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
  }, [date, isNorthernHemisphere, toast]);

  return (
    <div className="w-full">
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <div className="md:grid md:grid-cols-2">
                <div className="p-6 flex flex-col items-center justify-center gap-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        className="rounded-md border"
                        disabled={isPending}
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
                </div>
                <div className="flex flex-col items-center justify-center p-6">
                    {isPending && (
                        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                            <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
                            <h2 className="text-xl font-headline text-foreground/90 mb-2">Reading the Stars...</h2>
                            <p className="text-foreground/70">Determining the lunar energy for {format(date, 'PPP')}.</p>
                        </div>
                    )}
                    {!isPending && result && (
                        <div className="space-y-6 text-base text-foreground/90 animate-in fade-in duration-500 w-full text-center">
                            <div>
                                <h2 className="text-3xl font-headline text-primary mb-2">{result.phaseName}</h2>
                                <p className="font-semibold text-foreground/80">{format(date, 'PPP')}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Energy & Meaning</h3>
                                <p>{result.description}</p>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Ritual</h3>
                                <p>{result.ritual}</p>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Affirmation</h3>
                                <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                                    &quot;{result.affirmation}&quot;
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    </div>
  );
}
