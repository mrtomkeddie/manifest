import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-center h-20",
      className
    )}>
      <Image 
        src="/logo.png" 
        alt="Goddess Manifest Logo" 
        width={250}
        height={70}
        className="object-contain"
        priority 
      />
    </Link>
  );
}
