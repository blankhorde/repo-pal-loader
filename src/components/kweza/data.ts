export type PlayerState =
  | "ranked_paying"
  | "ranked_not_paying"
  | "not_on_board_yet"
  | "free_player";

export const playerStateLabels: Record<PlayerState, string> = {
  ranked_paying: "Ranked, paying",
  ranked_not_paying: "Ranked, not paying",
  not_on_board_yet: "Not on the board yet",
  free_player: "Free player",
};

export type StatusModel = {
  /** Plain-language line describing where the player stands. */
  headline: string;
  support: string;
  rank: string | null;
  points: string | null;
  prizeLabel: string | null;
  prizeCaption: string | null;
  nextLabel: string | null;
  nextPrize: string | null;
  progress: number; // 0..1 toward the next thing
  progressCaption: string | null;
  streak: number;
  button: string | null;
  freeLeft: number | null;
};

export function statusModel(state: PlayerState): StatusModel {
  switch (state) {
    case "ranked_paying":
      return {
        headline: "You are 12th this week",
        support: "This position pays at the end of the week.",
        rank: "12",
        points: "1,840",
        prizeLabel: "₦2,000",
        prizeCaption: "Your position pays",
        nextLabel: "60 points to reach 10th",
        nextPrize: "₦5,000",
        progress: 0.7,
        progressCaption: "60 points to reach 10th",
        streak: 5,
        button: "Continue CheckMate · puzzle 3 of 5",
        freeLeft: null,
      };
    case "ranked_not_paying":
      return {
        headline: "You are 62nd this week",
        support: "Positions 1 to 50 are paid on Sunday.",
        rank: "62",
        points: "1,120",
        prizeLabel: null,
        prizeCaption: "Your position does not pay yet",
        nextLabel: "120 points to reach 50th",
        nextPrize: "5GB data + ₦2,000",
        progress: 0.45,
        progressCaption: "120 points to reach 50th",
        streak: 5,
        button: null,
        freeLeft: null,
      };
    case "not_on_board_yet":
      return {
        headline: "No points yet this week",
        support: "Solve a puzzle to take a position. Positions 1 to 50 are paid on Sunday.",
        rank: null,
        points: "0",
        prizeLabel: null,
        prizeCaption: "Positions 1 to 50 are paid on Sunday",
        nextLabel: "Your first solve puts you on the board",
        nextPrize: null,
        progress: 0,
        progressCaption: "Your first solve puts you on the board",
        streak: 5,
        button: null,
        freeLeft: null,
      };
    case "free_player":
      return {
        headline: "You are on free play",
        support: "Free play does not earn points and does not take a position.",
        rank: null,
        points: null,
        prizeLabel: null,
        prizeCaption: "Free play earns no points",
        nextLabel: "2 of 5 free puzzles left today",
        nextPrize: null,
        progress: 0.4,
        progressCaption: "2 of 5 free puzzles left today",
        streak: 5,
        button: "Compete this week",
        freeLeft: 2,
      };
  }
}

export const announcements = [
  { title: "Week 35 payouts are out", line: "Check Winners for the full list." },
  {
    title: "New puzzle: OddOneOut",
    line: "Three belong. One does not. Live from Monday.",
  },
  {
    title: "Maintenance Sunday 2–3 AM",
    line: "Puzzles pause for an hour. Points are safe.",
  },
];

export type Puzzle = {
  name: string;
  blurb: string;
  today: "completed" | "not_played" | "coming";
  points?: number;
  hasImage: boolean;
  comingLabel?: string;
};

export const puzzles: Puzzle[] = [
  {
    name: "CheckMate",
    blurb: "Chess puzzles",
    today: "completed",
    points: 120,
    hasImage: true,
  },
  { name: "WisdomDrop", blurb: "African proverbs", today: "not_played", hasImage: true },
  {
    name: "OddOneOut",
    blurb: "Three belong. One does not.",
    today: "not_played",
    hasImage: true,
  },
  {
    name: "WordScramble",
    blurb: "Spell the word",
    today: "coming",
    hasImage: false,
    comingLabel: "Coming Monday",
  },
];
