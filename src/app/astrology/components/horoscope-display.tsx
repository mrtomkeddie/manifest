
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun } from 'lucide-react';


export function HoroscopeDisplay() {
  
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <Sun />
                Your Natal Chart
            </CardTitle>
        </CardHeader>
        
        <CardContent className="min-h-[150px] flex items-center justify-center">
            <p className="text-center text-foreground/60 p-4">
              Birth chart calculator coming soon...
            </p>
        </CardContent>
    </Card>
  );
}
