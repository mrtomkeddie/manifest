
'use client';
import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Sun, Moon, Sparkles, User } from 'lucide-react';
import type { GetNatalChartReadingOutput } from '@/ai/flows/get-natal-chart-reading';
import { getNatalChartReading } from '@/ai/flows/get-natal-chart-reading';
import { getMoonZodiacSign, getSunSign } from '@/services/astrology-service';
import type { ProfileFormValues } from '@/app/account/components/user-profile-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


type NatalChartData = GetNatalChartReadingOutput & {
    sunSign: string;
    moonSign: string;
};

export function HoroscopeDisplay() {
  const [chartData, setChartData] = useState<NatalChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const fetchChartData = () => {
      startTransition(async () => {
        setIsLoading(true);
        setError(null);
        setChartData(null);
        
        try {
          const storedProfile = localStorage.getItem('userProfile');
          if (!storedProfile) {
            setError("No profile data found. Please save your birth details on the 'My Profile' page first.");
            setIsLoading(false);
            return;
          }

          const profile: ProfileFormValues = JSON.parse(storedProfile);
          if (!profile.birthDate) {
             setError("Birth date is missing from your profile.");
             setIsLoading(false);
             return;
          }
          
          const birthDate = new Date(profile.birthDate);

          const [sunSign, moonSign] = await Promise.all([
            getSunSign(birthDate),
            getMoonZodiacSign(birthDate)
          ]);

          const reading = await getNatalChartReading({ sunSign, moonSign });

          setChartData({ ...reading, sunSign, moonSign });

        } catch (e) {
          console.error(e);
          setError("Could not generate your Cosmic Blueprint. The stars may be shy. Please try again later.");
          toast({
            title: 'Error Generating Chart',
            description: 'There was an issue creating your natal chart reading.',
            variant: 'destructive'
          })
        } finally {
          setIsLoading(false);
        }
      });
    }

    fetchChartData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isPending) {
    return (
        <Card className="w-full max-w-4xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5 min-h-[500px] flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
            <h2 className="text-xl font-headline text-foreground/90 mb-2">Generating Your Cosmic Blueprint...</h2>
            <p className="text-foreground/70">The universe is aligning to reveal your inner self.</p>
        </Card>
    )
  }
  
  if (error) {
     return (
        <Card className="w-full max-w-4xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5 min-h-[500px] flex flex-col items-center justify-center text-center p-8">
            <User className="w-12 h-12 text-primary/80 mb-4" />
            <h2 className="text-xl font-headline text-foreground/90 mb-2">Create Your Profile</h2>
            <p className="text-foreground/70 mb-6">{error}</p>
            <Button asChild>
                <Link href="/account">Go to My Profile</Link>
            </Button>
        </Card>
     )
  }

  if (chartData) {
    return (
        <Card className="w-full max-w-4xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary justify-center">
                    Your Cosmic Blueprint
                </CardTitle>
                <CardDescription className="text-center">
                An interpretation of your core astrological placements based on your birth details.
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                <div className="w-full space-y-8 text-left animate-in fade-in duration-500">
                    <h2 className="text-3xl font-headline text-center text-primary">{chartData.headline}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="bg-background/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Sun className="w-8 h-8 text-yellow-400" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-sans uppercase tracking-wider text-foreground/70">Sun Sign</span>
                                        <span className="font-headline text-2xl text-foreground/90">{chartData.sunSign}</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80">{chartData.sunSignInterpretation}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-background/40">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Moon className="w-8 h-8 text-slate-400" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-sans uppercase tracking-wider text-foreground/70">Moon Sign</span>
                                        <span className="font-headline text-2xl text-foreground/90">{chartData.moonSign}</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80">{chartData.moonSignInterpretation}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="bg-background/40">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Sparkles className="w-8 h-8 text-primary" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-sans uppercase tracking-wider text-foreground/70">Your Core Dynamic</span>
                                    <span className="font-headline text-2xl text-foreground/90">Sun-Moon Synergy</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-foreground/80">{chartData.combinedInterpretation}</p>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-foreground/60 w-full text-center">Full natal chart with Rising Sign and house placements coming soon!</p>
            </CardFooter>
        </Card>
    );
  }

  return null;
}
