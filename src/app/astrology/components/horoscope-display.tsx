
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Sun, Moon, Sparkles } from 'lucide-react';
import type { GetNatalChartReadingOutput } from '@/ai/flows/get-natal-chart-reading';

type NatalChartData = GetNatalChartReadingOutput & {
    sunSign: string;
    moonSign: string;
};

// Define the dummy data directly in the component
const dummyChartData: NatalChartData = {
    headline: "The Visionary Pioneer",
    sunSign: "Aries",
    moonSign: "Sagittarius",
    sunSignInterpretation: "Your Aries Sun gives you a bold, pioneering spirit. You are a natural leader, driven by a desire to initiate and conquer. Your core essence is fiery, courageous, and full of life force.",
    moonSignInterpretation: "Your Sagittarius Moon fuels your emotional world with a thirst for adventure, knowledge, and freedom. You find comfort in exploration and your intuition speaks to you through grand visions and optimistic feelings.",
    combinedInterpretation: "The fiery energy of your Aries Sun and Sagittarius Moon creates a powerfully dynamic and adventurous personality. You are here to explore new frontiers, both in the outer world and within your own mind. To balance these energies, channel your impulsive Aries nature with the wisdom-seeking Sagittarius spirit. Your greatest growth comes when you align your bold actions with a higher purpose."
};


export function HoroscopeDisplay() {
  // Set the state directly to the dummy data
  const [chartData] = useState<NatalChartData>(dummyChartData);
  
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

