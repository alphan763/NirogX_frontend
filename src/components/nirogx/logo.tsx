import { cn } from "@/lib/utils";

export function NirogXMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft",
        "size-12 text-2xl font-bold tracking-tight",
        className,
      )}
      aria-hidden="true"
    >
      N
    </div>
  );
}

export function NirogXWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("text-lg font-semibold tracking-tight text-foreground", className)}>
      Nirog<span className="text-primary">X</span>
    </span>
  );
}
