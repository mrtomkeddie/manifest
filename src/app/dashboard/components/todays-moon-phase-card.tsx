
import type { GetMoonPhaseOutput } from "@/ai/flows/get-moon-phase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Moon } from "lucide-react";
import Link from "next/link";

interface TodaysMoonPhaseCardProps {
    moonPhase: {
        phaseName: string;
        description: string;
    };
}

export function TodaysMoonPhaseCard({ moonPhase }: TodaysMoonPhaseCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Moon />
                    Today's Moon Phase
                </CardTitle>
                <CardDescription>A cosmic reading for {format(new Date(), 'PPP')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <h3 className="text-xl md:text-2xl font-headline font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                    {moonPhase.phaseName}
                </h3>
                <p className="text-foreground/80">{moonPhase.description}</p>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/moon">Get the full reading</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
