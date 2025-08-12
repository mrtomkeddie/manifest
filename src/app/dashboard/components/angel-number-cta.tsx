import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export function AngelNumberCta() {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5 flex flex-col items-center justify-center text-center">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Star />
                    Angel Numbers
                </CardTitle>
                <CardDescription>Decode the universe's messages.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-foreground/80">
                    Look up the meanings behind repeating number sequences you encounter throughout your day.
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href="/angel-numbers">Look up a Number</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
