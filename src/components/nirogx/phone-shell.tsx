import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "./bottom-nav";

export function PhoneShell({
  children,
  withNav = true,
  className,
}: {
  children: ReactNode;
  withNav?: boolean;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-secondary/60 py-0 sm:py-8">
      <div
        className={cn(
          "relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background sm:min-h-[860px] sm:rounded-[2.5rem] sm:shadow-lift sm:ring-1 sm:ring-border",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-1 flex-col overflow-hidden sm:rounded-[2.5rem]",
            withNav && "pb-[76px]",
          )}
        >
          {children}
        </div>
        {withNav ? <BottomNav /> : null}
      </div>
    </div>
  );
}
