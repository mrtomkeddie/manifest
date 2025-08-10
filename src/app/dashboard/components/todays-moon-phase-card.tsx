import type { GetMoonPhaseOutput } from "@/ai/flows/get-moon-phase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface TodaysMoonPhaseCardProps {
    moonPhase: GetMoonPhaseOutput;
}

export function TodaysMoonPhaseCard({ moonPhase }: TodaysMoonPhaseCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Moon />
                    Today's Moon & Stars
                </CardTitle>
                <CardDescription>A combined reading for {format(new Date(), 'PPP')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
                <div>
                     <p className="text-xl md:text-2xl font-headline font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                        {moonPhase.combinedReading.insight}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-left p-4 rounded-lg bg-background/50">
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-2">Moon Phase</h3>
                        <p className="font-semibold">{moonPhase.moonReading.phaseName}</p>
                    </div>
                     <div className="text-left p-4 rounded-lg bg-background/50">
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-2">Moon Sign</h3>
                        <p className="font-semibold">{moonPhase.starsReading.signAndAspects}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/moon">Get the full reading</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
