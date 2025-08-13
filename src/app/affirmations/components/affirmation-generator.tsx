import { getDailyAffirmations } from '@/ai/flows/get-daily-affirmations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export async function DailyAffirmations() {
  const { affirmations } = await getDailyAffirmations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {affirmations.map((result) => (
        <Card key={result.category} className="w-full bg-card/50 border-primary/20 shadow-lg shadow-primary/5 flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{result.category}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between gap-6">
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
              "{result.affirmation}"
            </p>
            {result.usageTip && (
              <div className="text-sm text-left text-foreground/80 bg-background/40 p-3 rounded-lg flex items-start gap-3">
                <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>{result.usageTip}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
