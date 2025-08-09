import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn(
      "relative flex items-center h-10 w-32",
      className
    )}>
      <Image 
        src="/logo.png" 
        alt="Goddess Manifest Logo" 
        fill
        className="object-contain"
      />
    </Link>
  );
}
