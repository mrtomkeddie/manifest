'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Moon, Sparkles, Wand2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { subscribeToMailerlite } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/goddess-manifest/logo';

function LeadCaptureForm() {
  const [state, formAction] = useActionState(subscribeToMailerlite, { message: '', success: false });
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Oops!',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="flex w-full max-w-md items-center space-x-2">
      <Input
        name="email"
        type="email"
        placeholder="Enter your email to begin..."
        className="flex-1 py-6 text-base bg-background/80 border-primary/50 focus:ring-primary"
        required
      />
      <Button type="submit" size="lg" className="py-6 bg-primary text-primary-foreground hover:bg-primary/90" disabled={pending}>
        {pending ? 'Sending...' : 'Join Free'}
        {!pending && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
    </form>
  );
}

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Daily Card Draw',
    description: 'Start your day with insight. Pull a card from our digital tarot deck for guidance and reflection.',
    link: '/daily-card',
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: 'Affirmation Generator',
    description: 'Shift your mindset. Generate powerful, positive affirmations tailored to your chosen focus area.',
    link: '/affirmations',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 9.5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3.5Z" /><path d="M18 16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1Z" /><path d="M8 20a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v-1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1Z" /></svg>
    ),
    title: 'Angel Numbers',
    description: 'Decode the universe\'s messages. Look up the meanings behind repeating number sequences you encounter.',
    link: '/angel-numbers',
  },
  {
    icon: <Moon className="h-8 w-8 text-primary" />,
    title: 'Moon Phase Calendar',
    description: 'Align with lunar cycles. Discover rituals and intentions for each phase of the moon.',
    link: '/moon',
  },
];

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-transparent">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <Button variant="ghost" asChild>
            <Link href="/affirmations">Enter App</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center text-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-background bg-grid-primary/5 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400 leading-tight">
              Manifesting Like a <span className="text-primary">Goddess</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-foreground/80">
              Unlock your divine power. Daily rituals, tarot guidance, and powerful affirmations to help you manifest the life of your dreams.
            </p>
            <div className="w-full max-w-md pt-4">
              <LeadCaptureForm />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-headline text-center mb-16">Your Divine Toolkit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2">
                  <CardHeader className="items-center text-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-foreground/70">
                    <p>{feature.description}</p>
                    <Button variant="link" className="text-primary mt-4" asChild>
                      <Link href={feature.link}>
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 sm:py-32 bg-card/50">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-headline text-center mb-6">Join the Goddess Circle</h2>
             <p className="max-w-3xl mx-auto text-lg text-foreground/80 mb-12">
              Elevate your practice with premium readings, a private journal, exclusive downloads, and live community events. Become the conscious creator of your reality.
             </p>
             <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-8 px-12 rounded-full" asChild>
                <Link href="/pricing">View Membership Plans</Link>
             </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t border-primary/10">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Goddess Manifest. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
