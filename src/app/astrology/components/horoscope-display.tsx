
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Sun, Loader2 } from 'lucide-react';
import type { ProfileFormValues } from '@/app/account/components/user-profile-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';


export function HoroscopeDisplay() {
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        // The date needs to be converted back to a Date object
        setProfile({
          ...parsedProfile,
          birthDate: new Date(parsedProfile.birthDate)
        });
      }
    } catch (error) {
        console.error("Failed to load user profile", error);
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <Sun />
                Your Cosmic Blueprint
            </CardTitle>
            <CardDescription>
              Based on the details from your profile, here are the foundational elements of your natal chart.
            </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-[150px] flex items-center justify-center">
            {isLoading && (
                 <div className="flex items-center gap-4 text-foreground/70">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p>Loading your profile...</p>
                </div>
            )}
            {!isLoading && profile && (
              <div className="w-full space-y-4 text-left animate-in fade-in duration-500">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/40">
                    <span className="font-semibold text-foreground/80">Name:</span>
                    <span className="font-medium text-foreground">{profile.name}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-background/40">
                    <span className="font-semibold text-foreground/80">Birth Date:</span>
                    <span className="font-medium text-foreground">{format(profile.birthDate, 'PPP')}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-background/40">
                    <span className="font-semibold text-foreground/80">Birth Time:</span>
                    <span className="font-medium text-foreground">{profile.birthTime}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-background/40">
                    <span className="font-semibold text-foreground/80">Birth Place:</span>
                    <span className="font-medium text-foreground">{profile.birthPlace}</span>
                </div>
              </div>
            )}
            {!isLoading && !profile && (
                <div className="text-center text-foreground/60 p-4 space-y-4">
                    <p>
                        Your birth details haven't been saved yet. Please fill out your profile to generate your natal chart.
                    </p>
                    <Button asChild>
                        <Link href="/account">Go to Profile</Link>
                    </Button>
              </div>
            )}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-foreground/60">Full natal chart calculations coming soon!</p>
        </CardFooter>
    </Card>
  );
}
