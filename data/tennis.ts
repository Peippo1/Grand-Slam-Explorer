import type {
  Match,
  Player,
  PlayerComparisonStat,
  PlayerSeasonStat,
  Tournament,
} from "@/types/tennis";

export const tournaments: Tournament[] = [
  {
    id: "australian-open",
    name: "Australian Open",
    surface: "Hard",
    location: "Melbourne, Australia",
    accent: "#38bdf8",
    accentSoft: "rgba(56, 189, 248, 0.16)",
    champion: "Aryna S. / Jannik S.",
    matches: 254,
    winRateHighlight: 82,
  },
  {
    id: "roland-garros",
    name: "Roland Garros",
    surface: "Clay",
    location: "Paris, France",
    accent: "#f97316",
    accentSoft: "rgba(249, 115, 22, 0.16)",
    champion: "Iga S. / Carlos A.",
    matches: 252,
    winRateHighlight: 78,
  },
  {
    id: "wimbledon",
    name: "Wimbledon",
    surface: "Grass",
    location: "London, United Kingdom",
    accent: "#8b5cf6",
    accentSoft: "rgba(34, 197, 94, 0.16)",
    champion: "Marketa V. / Novak D.",
    matches: 248,
    winRateHighlight: 75,
  },
  {
    id: "us-open",
    name: "US Open",
    surface: "Hard",
    location: "New York, United States",
    accent: "#facc15",
    accentSoft: "rgba(250, 204, 21, 0.16)",
    champion: "Coco G. / Daniil M.",
    matches: 256,
    winRateHighlight: 80,
  },
];

export const players: Player[] = [
  { id: "iga-swiatek", name: "Iga Swiatek", country: "POL", genderTour: "WTA", slamTitles: 5, favoriteSurface: "Clay" },
  { id: "aryna-sabalenka", name: "Aryna Sabalenka", country: "BLR", genderTour: "WTA", slamTitles: 3, favoriteSurface: "Hard" },
  { id: "coco-gauff", name: "Coco Gauff", country: "USA", genderTour: "WTA", slamTitles: 1, favoriteSurface: "Hard" },
  { id: "carlos-alcaraz", name: "Carlos Alcaraz", country: "ESP", genderTour: "ATP", slamTitles: 4, favoriteSurface: "Clay" },
  { id: "jannik-sinner", name: "Jannik Sinner", country: "ITA", genderTour: "ATP", slamTitles: 2, favoriteSurface: "Hard" },
  { id: "novak-djokovic", name: "Novak Djokovic", country: "SRB", genderTour: "ATP", slamTitles: 24, favoriteSurface: "Hard" },
];

export const matches: Match[] = [
  { id: "m-001", tournamentId: "australian-open", year: 2021, genderTour: "ATP", round: "Final", winnerId: "novak-djokovic", loserId: "jannik-sinner", score: "6-4 6-4 6-2", durationMinutes: 142, upsetRating: 22 },
  { id: "m-002", tournamentId: "australian-open", year: 2022, genderTour: "WTA", round: "Semifinal", winnerId: "aryna-sabalenka", loserId: "iga-swiatek", score: "7-6 4-6 6-3", durationMinutes: 158, upsetRating: 61 },
  { id: "m-003", tournamentId: "roland-garros", year: 2022, genderTour: "WTA", round: "Final", winnerId: "iga-swiatek", loserId: "coco-gauff", score: "6-1 6-3", durationMinutes: 82, upsetRating: 14 },
  { id: "m-004", tournamentId: "roland-garros", year: 2023, genderTour: "ATP", round: "Final", winnerId: "carlos-alcaraz", loserId: "novak-djokovic", score: "4-6 7-5 6-4 6-4", durationMinutes: 211, upsetRating: 72 },
  { id: "m-005", tournamentId: "wimbledon", year: 2023, genderTour: "ATP", round: "Final", winnerId: "carlos-alcaraz", loserId: "novak-djokovic", score: "1-6 7-6 6-1 3-6 6-4", durationMinutes: 285, upsetRating: 84 },
  { id: "m-006", tournamentId: "wimbledon", year: 2023, genderTour: "WTA", round: "Quarterfinal", winnerId: "coco-gauff", loserId: "aryna-sabalenka", score: "6-4 3-6 7-5", durationMinutes: 173, upsetRating: 66 },
  { id: "m-007", tournamentId: "us-open", year: 2023, genderTour: "WTA", round: "Final", winnerId: "coco-gauff", loserId: "aryna-sabalenka", score: "2-6 6-3 6-2", durationMinutes: 126, upsetRating: 79 },
  { id: "m-008", tournamentId: "us-open", year: 2024, genderTour: "ATP", round: "Semifinal", winnerId: "jannik-sinner", loserId: "carlos-alcaraz", score: "6-3 6-7 7-6 6-4", durationMinutes: 238, upsetRating: 58 },
  { id: "m-009", tournamentId: "australian-open", year: 2024, genderTour: "ATP", round: "Final", winnerId: "jannik-sinner", loserId: "novak-djokovic", score: "3-6 6-3 6-2 6-4", durationMinutes: 199, upsetRating: 88 },
  { id: "m-010", tournamentId: "roland-garros", year: 2024, genderTour: "WTA", round: "Final", winnerId: "iga-swiatek", loserId: "aryna-sabalenka", score: "7-5 6-4", durationMinutes: 116, upsetRating: 27 },
  { id: "m-011", tournamentId: "wimbledon", year: 2024, genderTour: "ATP", round: "Quarterfinal", winnerId: "novak-djokovic", loserId: "jannik-sinner", score: "6-4 4-6 7-6 6-3", durationMinutes: 226, upsetRating: 43 },
  { id: "m-012", tournamentId: "us-open", year: 2024, genderTour: "WTA", round: "Semifinal", winnerId: "iga-swiatek", loserId: "coco-gauff", score: "6-4 6-4", durationMinutes: 104, upsetRating: 35 },
];

export const playerSeasonStats: PlayerSeasonStat[] = [
  { playerId: "iga-swiatek", year: 2021, tournamentId: "australian-open", wins: 3, losses: 1 },
  { playerId: "iga-swiatek", year: 2022, tournamentId: "roland-garros", wins: 7, losses: 0 },
  { playerId: "iga-swiatek", year: 2023, tournamentId: "wimbledon", wins: 4, losses: 1 },
  { playerId: "iga-swiatek", year: 2024, tournamentId: "us-open", wins: 6, losses: 1 },
  { playerId: "carlos-alcaraz", year: 2021, tournamentId: "us-open", wins: 5, losses: 1 },
  { playerId: "carlos-alcaraz", year: 2022, tournamentId: "us-open", wins: 7, losses: 0 },
  { playerId: "carlos-alcaraz", year: 2023, tournamentId: "wimbledon", wins: 7, losses: 0 },
  { playerId: "carlos-alcaraz", year: 2024, tournamentId: "roland-garros", wins: 7, losses: 0 },
  { playerId: "jannik-sinner", year: 2021, tournamentId: "australian-open", wins: 2, losses: 1 },
  { playerId: "jannik-sinner", year: 2022, tournamentId: "wimbledon", wins: 5, losses: 1 },
  { playerId: "jannik-sinner", year: 2023, tournamentId: "us-open", wins: 4, losses: 1 },
  { playerId: "jannik-sinner", year: 2024, tournamentId: "australian-open", wins: 7, losses: 0 },
  { playerId: "novak-djokovic", year: 2021, tournamentId: "australian-open", wins: 7, losses: 0 },
  { playerId: "novak-djokovic", year: 2022, tournamentId: "wimbledon", wins: 7, losses: 0 },
  { playerId: "novak-djokovic", year: 2023, tournamentId: "roland-garros", wins: 7, losses: 0 },
  { playerId: "novak-djokovic", year: 2024, tournamentId: "wimbledon", wins: 5, losses: 1 },
];

export const playerComparisonStats: PlayerComparisonStat[] = [
  { playerId: "iga-swiatek", winRate: 86, slamTitles: 5, favoriteSurface: "Clay", bestTournament: "roland-garros", recentForm: ["W", "W", "L", "W", "W"] },
  { playerId: "aryna-sabalenka", winRate: 78, slamTitles: 3, favoriteSurface: "Hard", bestTournament: "australian-open", recentForm: ["W", "L", "W", "W", "L"] },
  { playerId: "coco-gauff", winRate: 74, slamTitles: 1, favoriteSurface: "Hard", bestTournament: "us-open", recentForm: ["L", "W", "W", "L", "W"] },
  { playerId: "carlos-alcaraz", winRate: 84, slamTitles: 4, favoriteSurface: "Clay", bestTournament: "wimbledon", recentForm: ["W", "W", "W", "L", "W"] },
  { playerId: "jannik-sinner", winRate: 81, slamTitles: 2, favoriteSurface: "Hard", bestTournament: "australian-open", recentForm: ["W", "L", "W", "W", "W"] },
  { playerId: "novak-djokovic", winRate: 88, slamTitles: 24, favoriteSurface: "Hard", bestTournament: "australian-open", recentForm: ["W", "W", "L", "W", "L"] },
];
