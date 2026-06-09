import { matches, playerSeasonStats, players, tournaments } from "@/data/tennis";
import type { DashboardFilters, DashboardMetrics, Match, TournamentId } from "@/types/tennis";

export function filterMatches(filters: DashboardFilters): Match[] {
  return matches.filter((match) => {
    const byTournament = filters.tournamentId === "all" || match.tournamentId === filters.tournamentId;
    const byYear = filters.year === "all" || match.year === filters.year;
    const byGender = filters.genderTour === "Both" || match.genderTour === filters.genderTour;
    const byPlayer =
      filters.playerId === "all" ||
      match.winnerId === filters.playerId ||
      match.loserId === filters.playerId;

    return byTournament && byYear && byGender && byPlayer;
  });
}

export function getPlayerName(playerId: string): string {
  return players.find((player) => player.id === playerId)?.name ?? "Unknown player";
}

export function getTournamentName(tournamentId: TournamentId): string {
  return tournaments.find((tournament) => tournament.id === tournamentId)?.name ?? "Unknown tournament";
}

export function getDashboardMetrics(filteredMatches: Match[]): DashboardMetrics {
  if (filteredMatches.length === 0) {
    return {
      totalMatches: 0,
      averageMatchLength: 0,
      mostSuccessfulPlayer: "No matches",
      biggestUpset: "No matches",
    };
  }

  const winCounts = new Map<string, number>();
  let durationTotal = 0;
  let biggestUpset = filteredMatches[0];

  for (const match of filteredMatches) {
    winCounts.set(match.winnerId, (winCounts.get(match.winnerId) ?? 0) + 1);
    durationTotal += match.durationMinutes;
    if (match.upsetRating > biggestUpset.upsetRating) {
      biggestUpset = match;
    }
  }

  const mostSuccessfulPlayerId = [...winCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  return {
    totalMatches: filteredMatches.length,
    averageMatchLength: Math.round(durationTotal / filteredMatches.length),
    mostSuccessfulPlayer: mostSuccessfulPlayerId ? getPlayerName(mostSuccessfulPlayerId) : "No matches",
    biggestUpset: `${getPlayerName(biggestUpset.winnerId)} d. ${getPlayerName(biggestUpset.loserId)}`,
  };
}

export function getWinsByTournament(filteredMatches: Match[]) {
  return tournaments.map((tournament) => ({
    name: tournament.name.replace("Australian Open", "Australian").replace("Roland Garros", "Roland"),
    wins: filteredMatches.filter((match) => match.tournamentId === tournament.id).length,
    fill: tournament.accent,
  }));
}

export function getWinsBySurface(filteredMatches: Match[]) {
  return tournaments
    .reduce<{ name: string; wins: number; fill: string }[]>((surfaceRows, tournament) => {
      const existing = surfaceRows.find((row) => row.name === tournament.surface);
      const wins = filteredMatches.filter((match) => match.tournamentId === tournament.id).length;
      if (existing) {
        existing.wins += wins;
      } else {
        surfaceRows.push({ name: tournament.surface, wins, fill: tournament.accent });
      }
      return surfaceRows;
    }, [])
    .filter((row) => row.wins > 0);
}

export function getPlayerPerformance(playerId: string | "all") {
  const targetPlayerId = playerId === "all" ? "carlos-alcaraz" : playerId;

  return playerSeasonStats
    .filter((stat) => stat.playerId === targetPlayerId)
    .sort((a, b) => a.year - b.year)
    .map((stat) => ({
      year: stat.year,
      wins: stat.wins,
      winRate: Math.round((stat.wins / (stat.wins + stat.losses)) * 100),
    }));
}

export function getAvailableYears(): number[] {
  return [...new Set(matches.map((match) => match.year))].sort((a, b) => b - a);
}
