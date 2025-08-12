import type { AngelNumberOutput } from "@/ai/flows/get-angel-number-meaning";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

interface TodaysAngelNumberCardProps {
    number: string;
    meaning: AngelNumberOutput;
}

export function TodaysAngelNumberCard({ number, meaning }: TodaysAngelNumberCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Star />
                    Today's Angel Number
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 text-center">
                 <h2 className="text-6xl font-headline text-primary tracking-widest">{number}</h2>
                    <div className="mb-8">
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Meaning</h3>
                        <p>{meaning.meaning}</p>
                    </div>
                        <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-sm mb-2">Affirmation</h3>
                        <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                            &quot;{meaning.affirmation}&quot;
                        </p>
                    </div>
            </CardContent>
             <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/angel-numbers">Look up a number</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
