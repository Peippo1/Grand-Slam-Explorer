export type TournamentId = "australian-open" | "roland-garros" | "wimbledon" | "us-open";

export type TournamentName = "Australian Open" | "Roland Garros" | "Wimbledon" | "US Open";

export type Surface = "Hard" | "Clay" | "Grass";

export type GenderTour = "ATP" | "WTA";

export interface Tournament {
  id: TournamentId;
  name: TournamentName;
  surface: Surface;
  location: string;
  accent: string;
  accentSoft: string;
  champion: string;
  matches: number;
  winRateHighlight: number;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  genderTour: GenderTour;
  slamTitles: number;
  favoriteSurface: Surface;
}

export interface Match {
  id: string;
  tournamentId: TournamentId;
  year: number;
  genderTour: GenderTour;
  round: string;
  winnerId: string;
  loserId: string;
  score: string;
  durationMinutes: number;
  upsetRating: number;
}

export interface PlayerSeasonStat {
  playerId: string;
  year: number;
  tournamentId: TournamentId;
  wins: number;
  losses: number;
}

export interface PlayerComparisonStat {
  playerId: string;
  winRate: number;
  slamTitles: number;
  favoriteSurface: Surface;
  bestTournament: TournamentId;
  recentForm: ("W" | "L")[];
}

export interface DashboardFilters {
  tournamentId: TournamentId | "all";
  year: number | "all";
  playerId: string | "all";
  genderTour: GenderTour | "Both";
}

export interface DashboardMetrics {
  totalMatches: number;
  averageMatchLength: number;
  mostSuccessfulPlayer: string;
  biggestUpset: string;
}
