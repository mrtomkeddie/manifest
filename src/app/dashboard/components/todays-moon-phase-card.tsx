import type { GetMoonPhaseOutput } from "@/ai/flows/get-moon-phase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Moon } from "lucide-react";
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
                    Today's Moon Phase
                </CardTitle>
                <CardDescription>For the Northern Hemisphere on {format(new Date(), 'PPP')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <h2 className="text-4xl font-headline text-primary mb-1">{moonPhase.phaseName}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Energy & Meaning</h3>
                        <p className="text-foreground/80">{moonPhase.description}</p>
                    </div>
                     <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Astrological Influence</h3>
                        <p className="text-foreground/80">{moonPhase.astrologicalInfluence}</p>
                    </div>
                    <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Ritual</h3>
                        <p className="text-foreground/80">{moonPhase.ritual}</p>
                    </div>
                   
                    <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Manifestation Action</h3>
                        <p className="text-foreground/80">{moonPhase.manifestationAction}</p>

                    </div>
                    <div className="md:col-span-2 text-center border-t border-primary/10 pt-6">
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Affirmation</h3>
                        <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                            &quot;{moonPhase.affirmation}&quot;
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/moon">View Moon Calendar</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
