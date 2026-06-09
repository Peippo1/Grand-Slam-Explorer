import { describe, expect, it } from "vitest";
import { filterMatches, getDashboardMetrics, getWinsByTournament } from "@/lib/tennis-analytics";
import type { DashboardFilters } from "@/types/tennis";

const baseFilters: DashboardFilters = {
  tournamentId: "all",
  year: "all",
  playerId: "all",
  genderTour: "Both",
};

describe("tennis analytics", () => {
  it("filters matches by tournament, year, gender, and player", () => {
    const filtered = filterMatches({
      ...baseFilters,
      tournamentId: "wimbledon",
      year: 2023,
      genderTour: "ATP",
      playerId: "carlos-alcaraz",
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.winnerId).toBe("carlos-alcaraz");
  });

  it("summarizes dashboard metrics for a filtered match set", () => {
    const filtered = filterMatches({ ...baseFilters, tournamentId: "roland-garros" });
    const metrics = getDashboardMetrics(filtered);

    expect(metrics.totalMatches).toBe(3);
    expect(metrics.averageMatchLength).toBeGreaterThan(0);
    expect(metrics.mostSuccessfulPlayer).toBe("Iga Swiatek");
  });

  it("builds chart-ready tournament win rows", () => {
    const rows = getWinsByTournament(filterMatches(baseFilters));

    expect(rows).toHaveLength(4);
    expect(rows.reduce((total, row) => total + row.wins, 0)).toBe(12);
  });
});
