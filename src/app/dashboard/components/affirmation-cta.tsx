import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2 } from "lucide-react";
import Link from "next/link";

export function AffirmationCta() {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Wand2 />
                    Affirmation Generator
                </CardTitle>
                <CardDescription>Craft the reality you desire.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-foreground/80">
                    Generate powerful, positive affirmations tailored to your chosen focus area to shift your mindset.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href="/affirmations">Generate Affirmation</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
