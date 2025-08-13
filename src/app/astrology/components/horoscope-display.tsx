
'use client';
import { useState, useTransition, useEffect } from 'react';
import { getDailyHoroscope, type GetDailyHoroscopeOutput } from '@/ai/flows/get-daily-horoscope';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sun, Sparkles } from 'lucide-react';

const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function HoroscopeDisplay() {
  const [sign, setSign] = useState('');
  const [result, setResult] = useState<GetDailyHoroscopeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetHoroscope = (selectedSign: string) => {
    if (!selectedSign) {
        setResult(null);
        return;
    }
    startTransition(async () => {
      try {
        const horoscopeResult = await getDailyHoroscope({ sign: selectedSign });
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
  
  useEffect(() => {
    if (sign) {
        handleGetHoroscope(sign);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sign]);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Sun />
                    Today's Horoscope
                </CardTitle>
                <Select value={sign} onValueChange={setSign} disabled={isPending}>
                    <SelectTrigger className="w-full md:w-[240px] h-11 text-base">
                        <SelectValue placeholder="Select your sign..." />
                    </SelectTrigger>
                    <SelectContent>
                    {zodiacSigns.map((s) => (
                        <SelectItem key={s} value={s}>
                        {s}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        
        <CardContent className="min-h-[150px] flex items-center justify-center">
            {isPending && (
                <div className="flex items-center gap-4 text-foreground/70">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p>Generating your personal horoscope...</p>
                </div>
            )}
            {!isPending && result && (
                <div className="text-base text-foreground/90 animate-in fade-in duration-500 w-full">
                     <p className="text-lg leading-relaxed">{result.horoscope}</p>
                </div>
            )}
             {!isPending && !result && (
                 <div className="text-center text-foreground/60 p-4">
                    <Sparkles className="mx-auto h-8 w-8 text-primary/50 mb-2" />
                    <p>Select your zodiac sign to reveal your daily horoscope.</p>
                </div>
            )}
        </CardContent>
    </Card>
  );
}
