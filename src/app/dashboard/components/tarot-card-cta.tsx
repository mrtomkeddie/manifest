import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function TarotCardCta() {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Sparkles />
                    Tarot Readings
                </CardTitle>
                <CardDescription>Receive your guidance for the day.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-foreground/80">
                   Start your day with insight. Pull a single card or perform a deep-dive reading for guidance and reflection.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href="/tarot-cards">Draw a Card</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
