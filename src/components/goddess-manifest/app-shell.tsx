import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
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

export function AppShell({ children, title }: { children: ReactNode; title: string }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent className="px-2">
            <SidebarMenu className="my-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarMenu className="my-2">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarMenu className="my-2">
              {premiumNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu className="my-2 px-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Account">
                  <Link href="/account">
                    <User />
                    <span>Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link href="/logout">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-10">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-headline font-semibold text-foreground/90">{title}</h1>
          </header>
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
