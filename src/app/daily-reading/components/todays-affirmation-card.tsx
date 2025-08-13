
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import Link from "next/link";

interface TodaysAffirmationCardProps {
    affirmation: string;
}

export function TodaysAffirmationCard({ affirmation }: TodaysAffirmationCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Wand2 />
                    Today's Affirmation
                </CardTitle>
                <CardDescription>Repeat this throughout your day to align your energy.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center text-center">
                <p className="text-2xl md:text-3xl font-headline font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                    &quot;{affirmation}&quot;
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="link" asChild>
                    <Link href="/affirmations">See all daily affirmations</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
