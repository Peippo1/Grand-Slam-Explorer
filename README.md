# Grand Slam Explorer

Grand Slam Explorer is a portfolio-quality interactive tennis analytics dashboard for exploring data across the four major Grand Slam tournaments:

- Australian Open
- Roland Garros / French Open
- Wimbledon
- US Open

The current MVP uses mock sample data, but the app is structured so real CSV/JSON data from sources such as Jeff Sackmann's tennis datasets can be plugged into the data layer later.

## Features

- Tournament summary cards with surface, location, sample champion, match count, and win-rate highlight
- Filters for tournament, year, player search, and ATP / WTA / Both
- Stat cards for total matches, average match length, most successful player, and biggest upset
- Recharts visualisations for wins by tournament, player performance over time, and wins by surface
- Notable matches table
- Player comparison section with win rate, Slam titles, favourite surface, best tournament, and recent form
- Responsive dark sports analytics UI built with Next.js, Tailwind CSS, shadcn-style components, and TypeScript

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local primitives
- Recharts
- Vitest

## Project Structure

```text
app/                     Next.js routes and global styles
components/              Dashboard and reusable UI components
data/tennis.ts           Mock tournament, player, match, and comparison data
lib/tennis-analytics.ts  Reusable filtering and chart aggregation logic
types/tennis.ts          Shared TypeScript tennis domain types
```

## App Routes

- `/` - overview dashboard with filters, stat cards, and rounded charts
- `/tournaments` - Grand Slam tournament profile cards
- `/players` - player comparison workspace
- `/matches` - match table explorer with filters

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npm run test
npm run build
```

## Connecting Real Tennis Data

The mock data is intentionally isolated in `data/tennis.ts`, and the UI consumes derived rows from `lib/tennis-analytics.ts`.

Suggested next steps for Jeff Sackmann datasets:

1. Extend `lib/tennis-importers/sackmann.ts` to read full CSV files rather than individual row objects.
2. Normalize player IDs into a durable local player registry.
3. Add validation for malformed scores, unknown tournaments, and duplicate match IDs.
4. Replace or merge the mock exports in `data/tennis.ts` with imported JSON generated from the CSV pipeline.
5. Add representative ATP and WTA fixture files before wiring the generated data into the dashboard.

Known limitation: the MVP data is fictitious and is designed for UI and architecture demonstration, not historical accuracy.
