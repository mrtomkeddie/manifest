
import { getDailyAngelNumberReadings } from '@/ai/flows/get-daily-angel-number-readings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function DailyAngelNumberReadings() {
  const { number, readings } = await getDailyAngelNumberReadings();

  return (
    <div className="w-full space-y-8">
        <h2 className="text-8xl font-headline text-center text-primary tracking-widest">{number}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readings.map((reading) => (
                <Card key={reading.topic} className="w-full bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{reading.topic}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-6">
                    <p className="text-base text-foreground/90">
                        {reading.meaning}
                    </p>
                    <div>
                        <h3 className="font-bold tracking-wider uppercase text-foreground/70 text-xs mb-1">Affirmation</h3>
                        <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
                            &quot;{reading.affirmation}&quot;
                        </p>
                    </div>
                </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
