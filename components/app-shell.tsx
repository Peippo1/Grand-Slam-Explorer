"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Home, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/players", label: "Players", icon: Users },
  { href: "/matches", label: "Matches", icon: CalendarDays },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen max-w-[100vw] overflow-x-hidden">
      <header className="sticky top-0 z-40 max-w-[100vw] overflow-x-hidden border-b border-emerald-900/10 bg-white/82 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1420px] min-w-0 flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">Grand Slam Explorer</div>
              <div className="text-xs text-muted-foreground">Tennis analytics workspace</div>
            </div>
          </Link>
          <nav className="grid w-full max-w-full min-w-0 grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-1 shadow-sm sm:flex lg:w-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex h-10 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2 text-sm font-medium transition sm:shrink-0 sm:justify-start sm:px-3",
                    active ? "bg-secondary text-primary shadow-sm" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
