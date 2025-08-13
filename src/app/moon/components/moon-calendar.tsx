
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getMoonPhase, type GetMoonPhaseOutput } from '@/ai/flows/get-moon-phase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Moon, Sparkles, Wand2, Star } from 'lucide-react';
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from "@/components/ui/calendar"
import { HoroscopeDisplay } from './horoscope-display';

function formatDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

export function MoonCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isNorthernHemisphere, setIsNorthernHemisphere] = useState(true);
  const [result, setResult] = useState<GetMoonPhaseOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 flex flex-col gap-8">
            <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
                <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setDate(d)}
                        className="rounded-md"
                        disabled={isPending || !date}
                        initialFocus
                    />
                </CardContent>
            </Card>
             <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
                <CardHeader>
                    <CardTitle>Select Hemisphere</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="hemisphere-switch">Southern</Label>
                        <Switch
                            id="hemisphere-switch"
                            checked={isNorthernHemisphere}
                            onCheckedChange={setIsNorthernHemisphere}
                            disabled={isPending}
                        />
                        <Label htmlFor="hemisphere-switch">Northern</Label>
                    </div>
                </CardContent>
             </Card>
            <Button onClick={handleGetReading} disabled={isPending || !date} className="h-12 text-base w-full">
                {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                )}
                {isPending ? 'Consulting...' : 'Get Reading'}
            </Button>
        </div>

        <div className="xl:col-span-2 space-y-8">
            {isPending && (
                <div className="flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
                    <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
                    <h2 className="text-xl font-headline text-foreground/90 mb-2">Reading the Cosmos...</h2>
                    {date && <p className="text-foreground/70">Determining the moon's energy for {format(date, 'PPP')}.</p>}
                </div>
            )}
            
            {!isPending && result && date && (
                <div className="w-full space-y-8 text-foreground/90 animate-in fade-in duration-500">
                    
                    {/* Moon Reading */}
                    <Card className="w-full bg-card/50 border-primary/10 shadow-lg shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl font-headline text-primary">
                                <Moon />
                                Moon Reading
                            </CardTitle>
                            <CardDescription>{result.phaseName} for {format(date, 'PPP')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-1">Energy & Meaning</h3>
                                <p className="text-foreground/80">{result.description}</p>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-1">Ritual</h3>
                                <p className="text-foreground/80">{result.ritual}</p>
                            </div>
                            <div>
                                <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-1">Affirmation</h3>
                                <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                                    &quot;{result.affirmation}&quot;
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {!isPending && !result && (
                <div className="text-center text-foreground/60 min-h-[300px] flex flex-col justify-center items-center">
                    <Moon className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                    <h2 className="text-2xl font-headline">Select a date</h2>
                    <p>Choose a date and your hemisphere to reveal the cosmic guidance.</p>
                </div>
            )}

            {!isPending && (
                <HoroscopeDisplay />
            )}
        </div>
    </div>
  );
}
