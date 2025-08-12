'use client';
import { useState, useTransition } from 'react';
import { generateAffirmation, type GenerateAffirmationOutput } from '@/ai/flows/generate-affirmation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Wand2, Loader2, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const categories = ['Random', 'Love', 'Confidence', 'Abundance', 'Calm', 'Health', 'Success'];
const affirmationCategories = categories.slice(1);

export function AffirmationGenerator() {
  const [category, setCategory] = useState(categories[0].toLowerCase());
  const [result, setResult] = useState<GenerateAffirmationOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        let finalCategory = category;
        if (finalCategory === 'random') {
          finalCategory = affirmationCategories[Math.floor(Math.random() * affirmationCategories.length)].toLowerCase();
        }
        const affirmationResult = await generateAffirmation({ category: finalCategory });
        setResult(affirmationResult);
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error',
          description: 'Could not generate an affirmation. Please try again later.',
          variant: 'destructive',
        });
      }
    });
  };
  
  const handleCopy = () => {
    if (result?.affirmation) {
      navigator.clipboard.writeText(result.affirmation);
      toast({
        title: 'Copied!',
        description: 'Affirmation copied to clipboard.',
      });
    }
  };

  return (
    <Card className="w-full mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={category} onValueChange={setCategory} disabled={isPending}>
            <SelectTrigger className="w-full md:w-[200px] h-12 text-base">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} disabled={isPending} className="h-12 text-base w-full md:flex-1">
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            {isPending ? 'Manifesting...' : 'Generate Affirmation'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-[150px] flex flex-col items-center justify-center p-6 gap-6">
        {result ? (
          <div className="text-center w-full animate-in fade-in duration-500">
            <p className="text-2xl md:text-3xl font-headline text-center font-semibold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400">
              "{result.affirmation}"
            </p>

            {result.usageTip && (
                <div className="mt-8">
                    <Separator className="my-4 bg-primary/20" />
                    <div className="text-sm text-foreground/80 bg-background/40 p-4 rounded-lg flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold mb-1">How to Use This Affirmation</h3>
                            <p>{result.usageTip}</p>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ) : (
            <p className="text-foreground/60">Your personal affirmation will appear here...</p>
        )}
      </CardContent>
      {result && !isPending && (
        <CardFooter className="justify-end">
            <Button variant="ghost" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
