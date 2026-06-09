"use client";

import { useMemo, useState } from "react";
import { Activity, Clock, Sparkles, Trophy } from "lucide-react";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardPageShell } from "@/components/dashboard-shell";
import { FilterBar } from "@/components/filter-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { filterMatches, getDashboardMetrics, getPlayerName, getPlayerPerformance, getTournamentName, getWinsBySurface, getWinsByTournament } from "@/lib/tennis-analytics";
import type { DashboardFilters } from "@/types/tennis";

const initialFilters: DashboardFilters = {
  tournamentId: "all",
  year: "all",
  playerId: "all",
  genderTour: "Both",
};

const icons = [Trophy, Clock, Activity, Sparkles];

export function OverviewDashboard() {
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);
  const [search, setSearch] = useState("");
  const filteredMatches = useMemo(() => filterMatches(filters), [filters]);
  const metrics = useMemo(() => getDashboardMetrics(filteredMatches), [filteredMatches]);
  const winsByTournament = useMemo(() => getWinsByTournament(filteredMatches), [filteredMatches]);
  const winsBySurface = useMemo(() => getWinsBySurface(filteredMatches), [filteredMatches]);
  const performance = useMemo(() => getPlayerPerformance(filters.playerId), [filters.playerId]);

  const metricRows = [
    { label: "Total matches", value: metrics.totalMatches, detail: "Sample matches in scope" },
    { label: "Average length", value: `${metrics.averageMatchLength}m`, detail: "Mean match duration" },
    { label: "Top performer", value: metrics.mostSuccessfulPlayer, detail: "Most wins in this view" },
    { label: "Biggest upset", value: metrics.biggestUpset, detail: "Highest upset index" },
  ];

  return (
    <DashboardPageShell
      title="Grand Slam Explorer"
      subtitle="Explore tennis data across the major tournaments with calm filters, rounded displays, and chart-ready mock data prepared for future real datasets."
    >
      <FilterBar filters={filters} search={search} onFiltersChange={setFilters} onSearchChange={setSearch} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricRows.map((metric, index) => {
          const Icon = icons[index];
          return (
            <Card key={metric.label} className="rounded-[1.35rem]">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
                    <p className="mt-2 truncate text-2xl font-semibold text-foreground">{metric.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{metric.detail}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr_0.85fr]">
        <ChartCard title="Wins by tournament" description="Filtered match wins grouped by Grand Slam.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={winsByTournament}>
              <XAxis dataKey="name" tick={{ fill: "#637083", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#637083", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(47,143,91,0.06)" }} />
              <Bar dataKey="wins" radius={[12, 12, 4, 4]}>
                {winsByTournament.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Player performance over time" description="Win-rate trend for the selected player.">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performance}>
              <XAxis dataKey="year" tick={{ fill: "#637083", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#637083", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="winRate" stroke="#2f8f5b" strokeWidth={3} dot={{ r: 5, fill: "#2f8f5b" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Wins by surface" description="A soft donut view of surface distribution.">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={winsBySurface} dataKey="wins" nameKey="name" innerRadius={62} outerRadius={96} cornerRadius={10} paddingAngle={4}>
                {winsBySurface.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <Card className="rounded-[1.35rem]">
        <CardHeader>
          <CardTitle>Featured matches</CardTitle>
          <CardDescription>A lighter overview table; the full match explorer has more room for records.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tournament</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMatches.slice(0, 5).map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{getTournamentName(match.tournamentId)}</TableCell>
                  <TableCell>{match.year}</TableCell>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{getPlayerName(match.winnerId)} d. {getPlayerName(match.loserId)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPageShell>
  );
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #d8e3df",
  borderRadius: "14px",
  color: "#10213f",
};

function ChartCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-[1.35rem]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
