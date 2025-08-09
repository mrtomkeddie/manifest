import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn(
      "flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors",
      className
    )}>
      <Image 
        src="https://placehold.co/40x40.png" 
        alt="Goddess Manifest Logo" 
        width={40} 
        height={40}
        className="rounded-md"
        data-ai-hint="logo"
      />
      <span className="font-headline">Goddess Manifest</span>
    </Link>
  );
}
