
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  birthDate: z.date({ required_error: 'A date of birth is required.' }),
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Please enter a valid 24-hour time (e.g., 14:30).' }),
  birthPlace: z.string().min(2, { message: 'Birth place is required.' }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getInitialValues = (): ProfileFormValues => ({
  name: '',
  birthDate: new Date(1990, 0, 1),
  birthTime: '12:00',
  birthPlace: '',
});

const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);
const months = Array.from({ length: 12 }, (_, i) => ({ value: i, label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));
const days = Array.from({ length: 31 }, (_, i) => i + 1);


export function UserProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getInitialValues(),
    mode: 'onChange',
  });
  
  const birthDateValue = form.watch('birthDate');

  useEffect(() => {
    try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const parsedProfile = JSON.parse(storedProfile);
            // Ensure birthDate is a Date object
            if(parsedProfile.birthDate) {
                parsedProfile.birthDate = new Date(parsedProfile.birthDate);
            }
            form.reset(parsedProfile);
        }
    } catch (error) {
        console.error("Failed to load user profile from local storage", error);
    }
  }, [form]);

  function onSubmit(data: ProfileFormValues) {
    localStorage.setItem('userProfile', JSON.stringify(data));
    toast({
      title: 'Profile Saved',
      description: 'Your cosmic profile has been saved successfully.',
    });
  }
  
  const handleDateChange = (part: 'day' | 'month' | 'year', value: string) => {
    const current_date = form.getValues('birthDate') || new Date();
    const newDate = new Date(current_date);
    if(part === 'day') newDate.setDate(parseInt(value));
    if(part === 'month') newDate.setMonth(parseInt(value));
    if(part === 'year') newDate.setFullYear(parseInt(value));
    form.setValue('birthDate', newDate, { shouldValidate: true, shouldDirty: true });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
            <CardTitle>Your Details</CardTitle>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                           <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <div className="flex flex-col sm:flex-row gap-2">
                                     <Select
                                        value={birthDateValue ? String(birthDateValue.getFullYear()) : ''}
                                        onValueChange={(val) => handleDateChange('year', val)}
                                        disabled={field.disabled}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                                        <SelectContent>
                                            {years.map(year => <SelectItem key={year} value={String(year)}>{year}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        value={birthDateValue ? String(birthDateValue.getMonth()) : ''}
                                        onValueChange={(val) => handleDateChange('month', val)}
                                        disabled={field.disabled}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                                        <SelectContent>
                                            {months.map(month => <SelectItem key={month.value} value={String(month.value)}>{month.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                     <Select
                                        value={birthDateValue ? String(birthDateValue.getDate()) : ''}
                                        onValueChange={(val) => handleDateChange('day', val)}
                                        disabled={field.disabled}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
                                        <SelectContent>
                                            {days.map(day => <SelectItem key={day} value={String(day)}>{day}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormMessage />
                           </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time of Birth (24-hour format)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 14:30" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Use the 24-hour format (00:00 to 23:59). If you don't know the exact time, you can enter 12:00.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthPlace"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Place of Birth</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., London, UK" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the city and country of your birth.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
