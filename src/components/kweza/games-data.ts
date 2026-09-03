export type GameCategory = "Logic" | "Memory" | "Focus" | "Language" | "Mixed";

export type Game = {
  name: string;
  blurb: string;
  category: GameCategory;
  live: boolean;
  hasImage: boolean;
  /** Points earned today on this game, live games only. Null means not played yet. */
  todayPoints?: number | null;
  /** Shown for coming-soon games that have a date. */
  comingLabel?: string;
};

export const games: Game[] = [
  {
    name: "CheckMate",
    blurb: "Chess puzzles",
    category: "Logic",
    live: true,
    hasImage: true,
    todayPoints: 120,
  },
  {
    name: "WisdomDrop",
    blurb: "African proverbs",
    category: "Language",
    live: true,
    hasImage: true,
    todayPoints: null,
  },
  {
    name: "OddOneOut",
    blurb: "Three belong. One does not.",
    category: "Logic",
    live: true,
    hasImage: true,
    todayPoints: 40,
  },
  {
    name: "WordScramble",
    blurb: "Spell the word",
    category: "Language",
    live: true,
    hasImage: false,
    todayPoints: null,
  },
  {
    name: "HigherLower",
    blurb: "Guess which number wins",
    category: "Logic",
    live: false,
    hasImage: true,
    comingLabel: "Coming Monday",
  },
  {
    name: "BalanceScale",
    blurb: "Even out both sides",
    category: "Logic",
    live: false,
    hasImage: true,
    comingLabel: "Coming in September",
  },
  {
    name: "BrainMix",
    blurb: "A little of everything",
    category: "Mixed",
    live: false,
    hasImage: false,
  },
  {
    name: "MemoryLane",
    blurb: "Remember the order",
    category: "Memory",
    live: false,
    hasImage: true,
    comingLabel: "Coming soon",
  },
  {
    name: "FlashRecall",
    blurb: "One look is all you get",
    category: "Memory",
    live: false,
    hasImage: true,
  },
  {
    name: "WhatsMissing",
    blurb: "Name the piece that left",
    category: "Memory",
    live: false,
    hasImage: false,
  },
  {
    name: "SpotIt",
    blurb: "Find the match before the clock",
    category: "Focus",
    live: false,
    hasImage: true,
    comingLabel: "Coming Friday",
  },
  {
    name: "FlowConnect",
    blurb: "Join the dots without crossing",
    category: "Focus",
    live: false,
    hasImage: true,
  },
];

export const liveGames = games.filter((g) => g.live);
export const comingGames = games.filter((g) => !g.live);

/** Featured games on Home, ordered so live games come first. */
export function featuredGames(count: number): Game[] {
  return [...liveGames, ...comingGames].slice(0, count);
}

/** Short line of today's activity for a tile. Free players never see points. */
export function activityLabel(g: Game, free: boolean): string | null {
  if (!g.live) return g.comingLabel ?? "Coming soon";
  if (free) return "Free play";
  if (g.todayPoints == null) return "Not played yet";
  return `+${g.todayPoints} today`;
}
