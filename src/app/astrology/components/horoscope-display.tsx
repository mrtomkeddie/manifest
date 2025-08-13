
'use client';
import { useState, useEffect, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Sun, Moon, Loader2, Sparkles } from 'lucide-react';
import type { ProfileFormValues } from '@/app/account/components/user-profile-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getSunSign, getMoonZodiacSign } from '@/services/astrology-service';
import { getNatalChartReading, type GetNatalChartReadingOutput } from '@/ai/flows/get-natal-chart-reading';
import { useToast } from '@/hooks/use-toast';

type NatalChartData = GetNatalChartReadingOutput & {
    sunSign: string;
    moonSign: string;
};

export function HoroscopeDisplay() {
  const [chartData, setChartData] = useState<NatalChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileMissing, setIsProfileMissing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNatalChart = async () => {
        setIsLoading(true);
        setIsProfileMissing(false);
        try {
            const storedProfile = localStorage.getItem('userProfile');
            if (!storedProfile) {
                setIsProfileMissing(true);
                return;
            }
            
            const profile: ProfileFormValues = JSON.parse(storedProfile);
            if (!profile.birthDate) {
                 setIsProfileMissing(true);
                return;
            }

            const birthDate = new Date(profile.birthDate);

            // Calculate signs
            const [sunSign, moonSign] = await Promise.all([
                getSunSign(birthDate),
                getMoonZodiacSign(birthDate),
            ]);
            
            // Get AI interpretation
            startTransition(async () => {
                try {
                    const reading = await getNatalChartReading({ sunSign, moonSign });
                    setChartData({ ...reading, sunSign, moonSign });
                } catch(e) {
                    console.error("AI Reading failed", e);
                    toast({
                        title: "Could not generate reading",
                        description: "The spirits are busy. Please try again later.",
                        variant: 'destructive',
                    });
                }
            });

        } catch (error) {
            console.error("Failed to load user profile or calculate chart", error);
            setIsProfileMissing(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchNatalChart();
  }, [toast]);
  
  const renderContent = () => {
    if (isLoading) {
        return (
             <div className="flex items-center gap-4 text-foreground/70 min-h-[200px] justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p>Loading your profile...</p>
            </div>
        );
    }
    
    if (isProfileMissing) {
        return (
            <div className="text-center text-foreground/60 p-4 space-y-4 min-h-[200px] justify-center">
                <p>
                    Your birth details haven't been saved yet. Please fill out your profile to generate your cosmic blueprint.
                </p>
                <Button asChild>
                    <Link href="/account">Go to Profile</Link>
                </Button>
          </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-6 min-h-[200px]">
              <Loader2 className="w-12 h-12 text-primary/80 animate-spin mb-4" />
              <h2 className="text-xl font-headline text-foreground/90 mb-2">Consulting the Cosmos...</h2>
              <p className="text-foreground/70">Interpreting your unique cosmic signature.</p>
            </div>
        )
    }

    if (chartData) {
        return (
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
        )
    }

    return null;
  }

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
            {renderContent()}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-foreground/60 w-full text-center">Full natal chart with Rising Sign and house placements coming soon!</p>
        </CardFooter>
    </Card>
  );
}
