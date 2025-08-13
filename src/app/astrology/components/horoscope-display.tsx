
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

const dummyChartData: NatalChartData = {
    headline: "The Visionary Pioneer",
    sunSign: "Aries",
    moonSign: "Sagittarius",
    sunSignInterpretation: "Your Aries Sun gives you a bold, pioneering spirit. You are a natural leader, driven by a desire to initiate and conquer. Your core essence is fiery, courageous, and full of life force.",
    moonSignInterpretation: "Your Sagittarius Moon fuels your emotional world with a thirst for adventure, knowledge, and freedom. You find comfort in exploration and your intuition speaks to you through grand visions and optimistic feelings.",
    combinedInterpretation: "The fiery energy of your Aries Sun and Sagittarius Moon creates a powerfully dynamic and adventurous personality. You are here to explore new frontiers, both in the outer world and within your own mind. To balance these energies, channel your impulsive Aries nature with the wisdom-seeking Sagittarius spirit. Your greatest growth comes when you align your bold actions with a higher purpose."
};


export function HoroscopeDisplay() {
  const [chartData, setChartData] = useState<NatalChartData | null>(dummyChartData);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileMissing, setIsProfileMissing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNatalChart = async () => {
        setIsLoading(true);
        setIsProfileMissing(false);
        setChartData(null);
        try {
            const storedProfile = localStorage.getItem('userProfile');
            if (!storedProfile) {
                setIsProfileMissing(true);
                setIsLoading(false);
                setChartData(null); // Ensure no data is shown if profile is missing
                return;
            }
            
            const profile: ProfileFormValues = JSON.parse(storedProfile);
            if (!profile.birthDate) {
                setIsProfileMissing(true);
                setIsLoading(false);
                setChartData(null);
                return;
            }

            const birthDate = new Date(profile.birthDate);

            // Calculate signs first
            const sunSign = await getSunSign(birthDate);
            const moonSign = await getMoonZodiacSign(birthDate);
            
            // Then, start the AI transition
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
                    setChartData(dummyChartData); // Show dummy data on AI failure
                }
            });

        } catch (error) {
            console.error("Failed to load user profile or calculate chart", error);
            setIsProfileMissing(true);
            setChartData(null);
        } finally {
            setIsLoading(false);
        }
    };
    
    // We'll run this on mount, but keep the dummy data for now
    fetchNatalChart();
  }, [toast]);
  
  const renderContent = () => {
    if (isLoading && !chartData) {
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
