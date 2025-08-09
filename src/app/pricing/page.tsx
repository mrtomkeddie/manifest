import { AppShell } from '@/components/goddess-manifest/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Goddess Monthly",
    price: "£9",
    period: "/month",
    description: "Perfect for dipping your toes into the divine feminine.",
    features: [
      "Premium Tarot Readings",
      "Private Reading Journal",
      "Exclusive Ritual Downloads",
      "Access to Live Events"
    ]
  },
  {
    name: "Goddess Annual",
    price: "£79",
    period: "/year",
    description: "Commit to your practice and save. Our best value.",
    features: [
      "Everything in Monthly",
      "2 Months Free",
      "Annual Planning Workshop",
      "Priority Support"
    ],
    isPopular: true,
  }
];

export default function PricingPage() {
  return (
    <AppShell title="Pricing">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-headline text-primary mb-2">Join the Goddess Circle</h1>
        <p className="max-w-2xl text-foreground/80 mb-12">
          Elevate your spiritual practice and unlock your full potential. Choose the path that aligns with your soul's calling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {plans.map(plan => (
            <Card key={plan.name} className={`flex flex-col bg-card/50 ${plan.isPopular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-primary/20'}`}>
              <CardHeader className="items-center text-center">
                {plan.isPopular && <div className="text-sm font-bold text-primary bg-primary/20 px-3 py-1 rounded-full mb-4">Most Popular</div>}
                <CardTitle className="text-3xl font-headline">{plan.name}</CardTitle>
                <div className="flex items-baseline pt-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-lg text-foreground/70">{plan.period}</span>
                </div>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-left">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12 text-lg">{plan.isPopular ? 'Choose Annual' : 'Choose Monthly'}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
