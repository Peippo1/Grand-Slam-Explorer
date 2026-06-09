import { describe, expect, it } from "vitest";
import {
  mapSackmannMatch,
  mapSackmannTournament,
  parseSackmannMinutes,
  parseSackmannYear,
} from "@/lib/tennis-importers/sackmann";

describe("sackmann importer", () => {
  it("maps Grand Slam aliases to internal tournament IDs", () => {
    expect(mapSackmannTournament("French Open")).toBe("roland-garros");
    expect(mapSackmannTournament("US Open")).toBe("us-open");
  });

  it("validates and parses tournament years", () => {
    expect(parseSackmannYear("20240526")).toBe(2024);
    expect(() => parseSackmannYear("bad-date")).toThrow("Invalid tourney_date");
  });

  it("normalizes optional match duration", () => {
    expect(parseSackmannMinutes("124")).toBe(124);
    expect(parseSackmannMinutes("")).toBe(0);
  });

  it("maps a source row into the shared match shape", () => {
    const parsed = mapSackmannMatch(
      {
        tourney_id: "2024-520",
        tourney_name: "Roland Garros",
        tourney_date: "20240526",
        match_num: "300",
        winner_id: "207989",
        winner_name: "Carlos Alcaraz",
        loser_id: "104925",
        loser_name: "Novak Djokovic",
        score: "6-4 6-7 6-3 6-4",
        round: "F",
        minutes: "210",
      },
      "ATP",
    );

    expect(parsed.match).toMatchObject({
      id: "atp-2024-520-300",
      tournamentId: "roland-garros",
      year: 2024,
      genderTour: "ATP",
      durationMinutes: 210,
    });
    expect(parsed.players).toHaveLength(2);
  });
});
