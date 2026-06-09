"use client";

import { useState } from "react";
import { DashboardPageShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { playerComparisonStats, players } from "@/data/tennis";
import { getTournamentName } from "@/lib/tennis-analytics";
import { cn } from "@/lib/utils";

export default function PlayersPage() {
  const [playerOne, setPlayerOne] = useState("carlos-alcaraz");
  const [playerTwo, setPlayerTwo] = useState("iga-swiatek");

  return (
    <DashboardPageShell
      title="Player Comparison"
      subtitle="Compare two players side by side with form, Slam titles, favourite surface, and best tournament signals."
    >
      <Card className="rounded-[1.5rem]">
        <CardHeader>
          <CardTitle>Choose players</CardTitle>
          <CardDescription>Mock comparison stats are isolated from the UI and ready for richer player data later.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <PlayerSelect value={playerOne} onChange={setPlayerOne} />
          <PlayerSelect value={playerTwo} onChange={setPlayerTwo} />
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        {[playerOne, playerTwo].map((playerId) => {
          const player = players.find((item) => item.id === playerId);
          const stat = playerComparisonStats.find((item) => item.playerId === playerId);
          if (!player || !stat) return null;

          return (
            <Card key={playerId} className="rounded-[1.5rem]">
              <CardContent className="space-y-5 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold text-foreground">{player.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{player.country} · {player.genderTour}</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-lg font-semibold text-primary">{stat.winRate}%</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ComparisonFact label="Slam titles" value={String(stat.slamTitles)} />
                  <ComparisonFact label="Favourite surface" value={stat.favoriteSurface} />
                  <ComparisonFact label="Best tournament" value={getTournamentName(stat.bestTournament)} />
                  <div className="rounded-[1.2rem] border border-border bg-secondary/60 p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Recent form</div>
                    <div className="mt-3 flex gap-2">
                      {stat.recentForm.map((result, index) => (
                        <span
                          key={`${result}-${index}`}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold",
                            result === "W" ? "bg-primary text-primary-foreground" : "bg-white text-muted-foreground",
                          )}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </DashboardPageShell>
  );
}

function PlayerSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>
        {players.map((player) => (
          <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ComparisonFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-border bg-secondary/60 p-4">
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="mt-2 text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}
