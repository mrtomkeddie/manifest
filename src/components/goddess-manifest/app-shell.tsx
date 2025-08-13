
'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
  Feather,
  LayoutDashboard,
  Sun,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/daily-reading', icon: <Feather />, label: 'Daily Reading' },
  { href: '/tarot-cards', icon: <Sparkles />, label: 'Tarot Cards' },
  { href: '/affirmations', icon: <Wand2 />, label: 'Affirmations' },
  { href: '/angel-numbers', icon: <Star />, label: 'Angel Numbers' },
  { href: '/moon', icon: <Moon />, label: 'Moon Calendar' },
];

const memberNav = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/journal', icon: <BookMarked />, label: 'Journal' },
  { href: '/members', icon: <Gem />, label: 'Membership' },
];

const footerNav = [
    { href: '/account', icon: <User />, label: 'Account' },
    { href: '/logout', icon: <LogOut />, label: 'Logout' },
]

function isSubpath(path: string, subpath: string) {
  if (subpath === '/') return path === '/';
  return path.startsWith(subpath) && (path.length === subpath.length || path[subpath.length] === '/');
}


export function AppShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    return isSubpath(pathname, href);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 z-50">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[300px]">
              <SheetHeader className="text-left">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
                <nav className="grid gap-2 text-lg font-medium mt-4">
                    <Link 
                        href="/" 
                        className={cn(
                            "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname === "/" && "text-primary"
                        )}
                    >
                        <Home className="h-5 w-5" />
                        Home
                    </Link>
                    
                    <hr className="my-2 border-primary/20" />
                    <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Features</h3>

                    {mainNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                isActive(item.href) && "text-primary"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                     <hr className="my-2 border-primary/20" />
                     <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Members</h3>

                    {memberNav.map((item) => (
                         <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                isActive(item.href) && "text-primary"
                            )}
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
                                className={cn(
                                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                    isActive(item.href) && "text-primary"
                                )}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-start">
            <h1 className="text-xl font-headline font-semibold text-foreground/90">{title}</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
      </main>
    </div>
  );
}
