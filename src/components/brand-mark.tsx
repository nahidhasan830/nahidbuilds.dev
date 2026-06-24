import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  onClick?: () => void;
};

export function BrandMark({ className, onClick }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center justify-center rounded-lg bg-primary/10 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-primary-foreground",
        className,
      )}
      aria-label="Home"
      onClick={onClick}
    >
      N
    </Link>
  );
}
