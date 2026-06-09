import { DashboardPageShell } from "@/components/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { tournaments } from "@/data/tennis";

export default function TournamentsPage() {
  return (
    <DashboardPageShell
      title="Tournament Profiles"
      subtitle="Compare each Grand Slam by surface, location, current sample champion, match volume, and visual tournament identity."
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden rounded-[1.5rem]">
            <div className="h-2" style={{ background: tournament.accent }} />
            <CardContent className="space-y-5 pt-5">
              <div>
                <div className="text-xl font-semibold text-foreground">{tournament.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{tournament.location}</div>
              </div>
              <div className="rounded-[1.25rem] border border-border bg-secondary/60 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Surface</div>
                <div className="mt-1 text-2xl font-semibold text-foreground">{tournament.surface}</div>
              </div>
              <div className="grid gap-3">
                <TournamentFact label="Sample champion" value={tournament.champion} />
                <TournamentFact label="Matches" value={String(tournament.matches)} />
                <TournamentFact label="Win-rate highlight" value={`${tournament.winRateHighlight}%`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </DashboardPageShell>
  );
}

function TournamentFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-border bg-white p-3">
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
