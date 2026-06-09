import { Trophy } from "lucide-react";

export function DashboardPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[100vw] overflow-x-hidden px-3 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1420px] min-w-0 flex-col gap-5 overflow-x-hidden">
        <section className="mobile-surface min-w-0 overflow-hidden rounded-[1.5rem] border border-emerald-900/10 bg-white/78 p-4 shadow-[0_24px_80px_rgba(46,91,74,0.10)] backdrop-blur sm:rounded-[1.75rem] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl">
              <div className="mb-4 inline-flex h-10 items-center gap-2 rounded-2xl border border-emerald-900/10 bg-emerald-50 px-3 text-sm font-medium text-primary">
                <Trophy className="h-4 w-4" />
                Grand Slam analytics
              </div>
              <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-full break-words text-base leading-7 text-slate-600">{subtitle}</p>
            </div>
          </div>
        </section>
        {children}
      </div>
    </main>
  );
}
