import type { GenderTour, Match, TournamentId } from "@/types/tennis";

export interface SackmannMatchRow {
  tourney_id: string;
  tourney_name: string;
  surface?: string;
  draw_size?: string;
  tourney_level?: string;
  tourney_date: string;
  match_num?: string;
  winner_id: string;
  winner_name: string;
  loser_id: string;
  loser_name: string;
  score?: string;
  best_of?: string;
  round: string;
  minutes?: string;
}

export interface ParsedSackmannMatch {
  match: Match;
  players: Array<{
    sourceId: string;
    name: string;
  }>;
}

const tournamentAliases: Record<string, TournamentId> = {
  "australian open": "australian-open",
  "roland garros": "roland-garros",
  "french open": "roland-garros",
  wimbledon: "wimbledon",
  "us open": "us-open",
  "u.s. open": "us-open",
};

export function parseSackmannYear(tourneyDate: string): number {
  const year = Number(tourneyDate.slice(0, 4));
  if (!Number.isInteger(year) || year < 1900) {
    throw new Error(`Invalid tourney_date: ${tourneyDate}`);
  }
  return year;
}

export function mapSackmannTournament(name: string): TournamentId {
  const tournamentId = tournamentAliases[name.trim().toLowerCase()];
  if (!tournamentId) {
    throw new Error(`Unsupported Grand Slam tournament: ${name}`);
  }
  return tournamentId;
}

export function parseSackmannMinutes(minutes?: string): number {
  if (!minutes) return 0;
  const parsed = Number(minutes);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : 0;
}

export function mapSackmannMatch(row: SackmannMatchRow, genderTour: GenderTour): ParsedSackmannMatch {
  const tournamentId = mapSackmannTournament(row.tourney_name);
  const year = parseSackmannYear(row.tourney_date);
  const matchNumber = row.match_num?.trim() || `${row.winner_id}-${row.loser_id}`;

  return {
    match: {
      id: `${genderTour.toLowerCase()}-${row.tourney_id}-${matchNumber}`,
      tournamentId,
      year,
      genderTour,
      round: row.round,
      winnerId: `sackmann-${row.winner_id}`,
      loserId: `sackmann-${row.loser_id}`,
      score: row.score?.trim() || "Score unavailable",
      durationMinutes: parseSackmannMinutes(row.minutes),
      upsetRating: 0,
    },
    players: [
      { sourceId: row.winner_id, name: row.winner_name },
      { sourceId: row.loser_id, name: row.loser_name },
    ],
  };
}
