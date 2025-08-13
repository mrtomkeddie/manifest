import type { DrawTarotCardOutput } from "@/ai/flows/draw-tarot-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TarotCardProps {
    card: DrawTarotCardOutput;
}

export function TarotCard({ card }: TarotCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Sparkles />
                    Today's Tarot Card
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                 <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3 flex-shrink-0">
                        <Image
                            src={card.image}
                            alt={card.cardName}
                            width={400}
                            height={600}
                            className="rounded-lg shadow-lg shadow-primary/10 aspect-[2/3] object-cover w-full"
                        />
                    </div>
                    <div className="sm:w-2/3 space-y-4">
                        <h3 className="text-2xl font-headline text-foreground/90">
                            {card.cardName} <span className="text-base font-sans text-foreground/70">({card.orientation})</span>
                        </h3>
                        <div>
                            <h4 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-1">Meaning</h4>
                            <p className="text-foreground/80 text-sm">{card.meaning}</p>
                        </div>
                         <div>
                            <h4 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-1">Affirmation</h4>
                            <p className="font-semibold text-base text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                                &quot;{card.affirmation}&quot;
                            </p>
                        </div>
                    </div>
                 </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/tarot-cards/three-card">Explore Readings</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
