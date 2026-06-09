"use client";

import { Search } from "lucide-react";
import { players, tournaments } from "@/data/tennis";
import { getAvailableYears } from "@/lib/tennis-analytics";
import type { DashboardFilters, GenderTour, TournamentId } from "@/types/tennis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterBar({
  filters,
  search,
  onFiltersChange,
  onSearchChange,
}: {
  filters: DashboardFilters;
  search: string;
  onFiltersChange: (filters: DashboardFilters) => void;
  onSearchChange: (value: string) => void;
}) {
  const visiblePlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender = filters.genderTour === "Both" || player.genderTour === filters.genderTour;
    return matchesSearch && matchesGender;
  });

  return (
    <section className="mobile-surface grid min-w-0 gap-3 overflow-hidden rounded-[1.35rem] border border-border bg-white/88 p-2 shadow-sm sm:p-3 md:grid-cols-2 xl:grid-cols-[1fr_0.8fr_1.1fr_1fr_1fr]">
      <FilterField label="Tournament">
        <Select
          value={filters.tournamentId}
          onValueChange={(value) => onFiltersChange({ ...filters, tournamentId: value as TournamentId | "all" })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tournaments</SelectItem>
            {tournaments.map((tournament) => (
              <SelectItem key={tournament.id} value={tournament.id}>{tournament.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>
      <FilterField label="Year">
        <Select
          value={String(filters.year)}
          onValueChange={(value) => onFiltersChange({ ...filters, year: value === "all" ? "all" : Number(value) })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All years</SelectItem>
            {getAvailableYears().map((year) => (
              <SelectItem key={year} value={String(year)}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>
      <div className="min-w-0 space-y-2">
        <Label htmlFor="player-search">Player search</Label>
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="player-search" value={search} onChange={(event) => onSearchChange(event.target.value)} className="pl-9" placeholder="Search players" />
        </div>
      </div>
      <FilterField label="Player">
        <Select value={filters.playerId} onValueChange={(value) => onFiltersChange({ ...filters, playerId: value })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All players</SelectItem>
            {visiblePlayers.map((player) => (
              <SelectItem key={player.id} value={player.id}>{player.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>
      <div className="min-w-0 space-y-2">
        <Label>Gender</Label>
        <div className="grid min-w-0 grid-cols-3 rounded-2xl border border-border bg-secondary/70 p-1">
          {(["ATP", "WTA", "Both"] as const).map((option) => (
            <Button
              key={option}
              type="button"
              variant={filters.genderTour === option ? "default" : "ghost"}
              size="sm"
              className="min-w-0 rounded-xl px-1"
              onClick={() => onFiltersChange({ ...filters, genderTour: option as GenderTour | "Both" })}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
