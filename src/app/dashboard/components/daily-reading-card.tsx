import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Feather } from "lucide-react";

interface DailyReadingCardProps {
    reading: string;
}

export function DailyReadingCard({ reading }: DailyReadingCardProps) {
    return (
        <Card className="w-full bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                    <Feather />
                    Today's Reading
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-foreground/90 whitespace-pre-wrap">{reading}</p>
            </CardContent>
        </Card>
    );
}
