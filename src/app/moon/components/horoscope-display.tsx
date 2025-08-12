'use client';
import { useState, useTransition } from 'react';
import { getDailyHoroscope, type GetDailyHoroscopeOutput } from '@/ai/flows/get-daily-horoscope';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Sparkles, Sun } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function HoroscopeDisplay() {
  const [sign, setSign] = useState('');
  const [result, setResult] = useState<GetDailyHoroscopeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetHoroscope = () => {
    if (!sign) {
      toast({
        title: 'Select a Sign',
        description: 'Please choose your zodiac sign to get a horoscope.',
        variant: 'destructive',
      });
      return;
    }
    startTransition(async () => {
      try {
        const horoscopeResult = await getDailyHoroscope({ sign });
        setResult(horoscopeResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not generate a horoscope. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };
  
  return (
    <Card className="w-full mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline text-primary">
                <Sun />
                Daily Horoscope
            </CardTitle>
            <CardDescription>Select your sign to receive your cosmic guidance.</CardDescription>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Select value={sign} onValueChange={setSign} disabled={isPending}>
                    <SelectTrigger className="w-full md:w-[240px] h-12 text-base">
                        <SelectValue placeholder="Select your sign" />
                    </SelectTrigger>
                    <SelectContent>
                    {zodiacSigns.map((s) => (
                        <SelectItem key={s} value={s}>
                        {s}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleGetHoroscope} disabled={isPending || !sign} className="h-12 text-base w-full md:flex-1">
                    {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                    <Wand2 className="mr-2 h-5 w-5" />
                    )}
                    {isPending ? 'Consulting...' : 'Get Horoscope'}
                </Button>
            </div>
        </CardHeader>
        {result && !isPending && (
            <CardContent>
                <Separator className="my-4 bg-primary/20" />
                <div className="text-base text-foreground/90 bg-background/40 p-4 rounded-lg animate-in fade-in duration-500">
                    <p>{result.horoscope}</p>
                </div>
            </CardContent>
        )}
        {isPending && (
             <CardContent className="min-h-[100px] flex items-center justify-center">
                <div className="flex items-center gap-4 text-foreground/70">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p>Generating your personal horoscope...</p>
                </div>
            </CardContent>
        )}
    </Card>
  );
}
