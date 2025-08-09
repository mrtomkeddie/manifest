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
        src="/logo.png" 
        alt="Goddess Manifest Logo" 
        width={120} 
        height={40}
        className="object-contain"
      />
    </Link>
  );
}
