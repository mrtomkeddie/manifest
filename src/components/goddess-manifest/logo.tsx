import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-start",
      className
    )}>
      <Image 
        src="/logo.png" 
        alt="Goddess Manifest Logo" 
        width={180}
        height={50}
        priority 
      />
    </Link>
  );
}
