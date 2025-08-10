import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from './logo';
import {
  Sparkles,
  Wand2,
  Moon,
  Gem,
  BookMarked,
  Download,
  Calendar,
  User,
  LogOut,
  Star,
  Home,
  Menu,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';

const mainNav = [
  { href: '/daily-card', icon: <Sparkles />, label: 'Daily Card' },
  { href: '/affirmations', icon: <Wand2 />, label: 'Affirmations' },
  { href: '/angel-numbers', icon: <Star />, label: 'Angel Numbers' },
  { href: '/moon', icon: <Moon />, label: 'Moon Calendar' },
];

const premiumNav = [
  { href: '/pricing', icon: <Gem />, label: 'Go Premium' },
  { href: '/members/journal', icon: <BookMarked />, label: 'Journal', premium: true },
  { href: '/members/downloads', icon: <Download />, label: 'Downloads', premium: true },
  { href: '/members/events', icon: <Calendar />, label: 'Events', premium: true },
];

const footerNav = [
    { href: '/account', icon: <User />, label: 'Account' },
    { href: '/logout', icon: <LogOut />, label: 'Logout' },
]

export function AppShell({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo />
                    </div>
                    <Link href="/" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Home className="h-5 w-5" />
                        Home
                    </Link>
                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                     <hr className="my-4" />
                    {premiumNav.map((item) => (
                         <Link
                            key={item.href}
                            href={item.href}
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto">
                    <nav className="grid gap-2 text-lg font-medium">
                        <hr className="my-4" />
                        {footerNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <h1 className="text-xl font-headline font-semibold text-foreground/90">{title}</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
