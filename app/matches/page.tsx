"use client";

import { useMemo, useState } from "react";
import { DashboardPageShell } from "@/components/dashboard-shell";
import { FilterBar } from "@/components/filter-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { filterMatches, getPlayerName, getTournamentName } from "@/lib/tennis-analytics";
import type { DashboardFilters } from "@/types/tennis";

const initialFilters: DashboardFilters = {
  tournamentId: "all",
  year: "all",
  playerId: "all",
  genderTour: "Both",
};

export default function MatchesPage() {
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);
  const [search, setSearch] = useState("");
  const filteredMatches = useMemo(() => filterMatches(filters), [filters]);

  return (
    <DashboardPageShell
      title="Match Explorer"
      subtitle="Browse notable mock match records with filters that mirror the controls needed for future CSV-backed datasets."
    >
      <FilterBar filters={filters} search={search} onFiltersChange={setFilters} onSearchChange={setSearch} />
      <Card className="rounded-[1.5rem]">
        <CardHeader>
          <CardTitle>Notable matches</CardTitle>
          <CardDescription>{filteredMatches.length} records currently match the active filters.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Length</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{getTournamentName(match.tournamentId)}</TableCell>
                  <TableCell>{match.year}</TableCell>
                  <TableCell>{match.genderTour}</TableCell>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{getPlayerName(match.winnerId)} d. {getPlayerName(match.loserId)}</TableCell>
                  <TableCell>{match.score}</TableCell>
                  <TableCell className="text-right">{match.durationMinutes}m</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPageShell>
  );
}
