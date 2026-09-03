import type { PlayerState } from "./data";

/**
 * Six-plus treatments for the space between the band meter and the
 * streak/countdown footer in status option 5. No boxes or tiles:
 * typography, spacing and one accent only.
 */

export const spaceVariantLabels = ["5a", "5b", "5c", "5d", "5e", "5f", "5g", "5h", "5i"];

export const spaceVariantCaptions: Record<number, string> = {
  0: "One instruction line at reading size with the money folded into a quieter second line underneath.",
  1: "The distance becomes a single large numeral, so how close you are lands before any words.",
  2: "A two-rung ladder puts the next position directly above where you stand, so the climb is visible.",
  3: "The whole space is one flowing sentence, with only the numbers weighted.",
  4: "Hairline label-and-value rows read like a quiet fact sheet, no container around them.",
  5: "A single accent rule on the left holds a short promise line and its Sunday condition.",
  6: "A small overline names the step, a short headline states it, and the condition trails behind.",
  7: "Same next-step content as 5g, gathered into one soft, filled container with a subtle border and a left brand accent so it reads as a single object.",
  8: "Same next-step content as 5g, gathered into one hairline-outlined container to compare against the fill.",
};

type Lines = {
  over?: string;
  lead: string;
  sub?: string;
  big?: string;
  bigUnit?: string;
  rows?: Array<[string, string]>;
  rungs?: Array<{ text: string; now?: boolean }>;
  foot?: string;
};

const V: Array<Record<PlayerState, Lines>> = [
  // A — lead line + fine print
  {
    ranked_paying: {
      lead: "60 points takes you to 10th.",
      sub: "Hold 10th to Sunday and it pays ₦5,000. Where you stand now pays ₦2,000.",
    },
    ranked_not_paying: {
      lead: "120 points reaches 50th, the last paid position.",
      sub: "Whoever holds 50th on Sunday takes 5GB data plus ₦2,000.",
    },
    not_on_board_yet: {
      lead: "One solve puts you on the board.",
      sub: "Positions 1 to 50 are paid on Sunday, and the week is still open.",
    },
    free_player: {
      lead: "2 of your 5 free puzzles are left today.",
      sub: "Free play is just for fun — points and a weekly position start when you compete.",
    },
  },
  // B — big numeral
  {
    ranked_paying: {
      big: "60",
      bigUnit: "points to 10th",
      lead: "",
      sub: "10th pays ₦5,000 and 12th pays ₦2,000, to whoever is holding them on Sunday.",
    },
    ranked_not_paying: {
      big: "120",
      bigUnit: "points to 50th",
      lead: "",
      sub: "50th is the last paid position, worth 5GB data plus ₦2,000 on Sunday.",
    },
    not_on_board_yet: {
      big: "1",
      bigUnit: "solve to join the board",
      lead: "",
      sub: "From there you are climbing toward the paid top 50.",
    },
    free_player: {
      big: "2",
      bigUnit: "free puzzles left today",
      lead: "",
      sub: "Competing is what turns solves into points and a position.",
    },
  },
  // C — two-rung ladder
  {
    ranked_paying: {
      lead: "",
      rungs: [
        { text: "10th · ₦5,000 · 60 points away" },
        { text: "12th · ₦2,000 · where you stand now", now: true },
      ],
      foot: "Sunday pays whoever is holding each position then.",
    },
    ranked_not_paying: {
      lead: "",
      rungs: [
        { text: "50th · 5GB data + ₦2,000 · 120 points away" },
        { text: "62nd · where you stand now", now: true },
      ],
      foot: "Every position from 1 to 50 is paid on Sunday.",
    },
    not_on_board_yet: {
      lead: "",
      rungs: [
        { text: "50th · the last paid position" },
        { text: "Not on the board · one solve changes that", now: true },
      ],
      foot: "Positions are paid on Sunday, and nothing is settled yet.",
    },
    free_player: {
      lead: "",
      rungs: [
        { text: "Competing · points and a position every week" },
        { text: "Free play · 2 of 5 puzzles left today", now: true },
      ],
      foot: "You can start competing any time before Sunday.",
    },
  },
  // D — one sentence
  {
    ranked_paying: {
      lead: "You are |60| points from 10th, which pays ₦5,000 to whoever holds it on Sunday. Where you stand now pays ₦2,000.",
    },
    ranked_not_paying: {
      lead: "Another |120| points puts you in 50th, the last paid position — 5GB data plus ₦2,000 for whoever is there on Sunday.",
    },
    not_on_board_yet: {
      lead: "Your |first| solve gives you a position, and positions 1 to 50 are paid on Sunday.",
    },
    free_player: {
      lead: "You have |2| free puzzles left today. Competing is how solves start earning points and a position for the week.",
    },
  },
  // E — hairline fact rows
  {
    ranked_paying: {
      lead: "",
      rows: [
        ["To reach 10th", "60 points"],
        ["10th, held to Sunday", "₦5,000"],
        ["12th, held to Sunday", "₦2,000"],
      ],
    },
    ranked_not_paying: {
      lead: "",
      rows: [
        ["To reach 50th", "120 points"],
        ["50th, held to Sunday", "5GB data + ₦2,000"],
        ["Paid on Sunday", "positions 1 to 50"],
      ],
    },
    not_on_board_yet: {
      lead: "",
      rows: [
        ["To join the board", "one solve"],
        ["Paid on Sunday", "positions 1 to 50"],
      ],
    },
    free_player: {
      lead: "",
      rows: [
        ["Free puzzles left today", "2 of 5"],
        ["Points and a position", "come with competing"],
      ],
    },
  },
  // F — accent rule
  {
    ranked_paying: {
      lead: "60 points and 10th is yours",
      sub: "Sunday pays whoever is holding it: ₦5,000 there, ₦2,000 from where you stand.",
    },
    ranked_not_paying: {
      lead: "120 points reaches 50th",
      sub: "The last paid position, worth 5GB data plus ₦2,000 to whoever holds it on Sunday.",
    },
    not_on_board_yet: {
      lead: "One solved puzzle gives you a position",
      sub: "From there the top 50 are in reach, and they are paid on Sunday.",
    },
    free_player: {
      lead: "2 free puzzles left today",
      sub: "Compete and every solve starts moving a real position for the week.",
    },
  },
  // G — overline + headline + condition
  {
    ranked_paying: {
      over: "Next step",
      lead: "10th, 60 points away",
      sub: "Pays ₦5,000 to whoever holds it on Sunday. From 12th you would take ₦2,000.",
    },
    ranked_not_paying: {
      over: "Next step",
      lead: "50th, 120 points away",
      sub: "The last paid position: 5GB data plus ₦2,000 on Sunday.",
    },
    not_on_board_yet: {
      over: "First step",
      lead: "Solve one puzzle",
      sub: "That gives you a position, and positions 1 to 50 are paid on Sunday.",
    },
    free_player: {
      over: "Today",
      lead: "2 free puzzles left",
      sub: "Points and a weekly position start the moment you compete.",
    },
  },
  // H — 5g content inside a soft, filled container
  {
    ranked_paying: {
      over: "Next step",
      lead: "10th, 60 points away",
      sub: "Pays ₦5,000 to whoever holds it on Sunday. From 12th you would take ₦2,000.",
    },
    ranked_not_paying: {
      over: "Next step",
      lead: "50th, 120 points away",
      sub: "The last paid position: 5GB data plus ₦2,000 on Sunday.",
    },
    not_on_board_yet: {
      over: "First step",
      lead: "Solve one puzzle",
      sub: "That gives you a position, and positions 1 to 50 are paid on Sunday.",
    },
    free_player: {
      over: "Today",
      lead: "2 free puzzles left",
      sub: "Points and a weekly position start the moment you compete.",
    },
  },
  // I — 5g content inside a hairline-outlined container
  {
    ranked_paying: {
      over: "Next step",
      lead: "10th, 60 points away",
      sub: "Pays ₦5,000 to whoever holds it on Sunday. From 12th you would take ₦2,000.",
    },
    ranked_not_paying: {
      over: "Next step",
      lead: "50th, 120 points away",
      sub: "The last paid position: 5GB data plus ₦2,000 on Sunday.",
    },
    not_on_board_yet: {
      over: "First step",
      lead: "Solve one puzzle",
      sub: "That gives you a position, and positions 1 to 50 are paid on Sunday.",
    },
    free_player: {
      over: "Today",
      lead: "2 free puzzles left",
      sub: "Points and a weekly position start the moment you compete.",
    },
  },
];

function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split("|").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-bold text-brand">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function StatusSpace({
  variant,
  state,
}: {
  variant: number;
  state: PlayerState;
}) {
  const l = (V[variant] ?? V[0]!)[state];

  if (variant === 1) {
    return (
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-extrabold leading-none tabular-nums text-brand">
            {l.big}
          </span>
          <span className="text-[13px] font-semibold leading-snug">{l.bigUnit}</span>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="mt-5">
        <ol className="space-y-2">
          {l.rungs?.map((r) => (
            <li key={r.text} className="flex items-start gap-2.5">
              <span
                className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                  r.now ? "bg-border" : "bg-brand"
                }`}
              />
              <span
                className={`text-[13px] leading-snug ${
                  r.now ? "text-muted-foreground" : "font-semibold"
                }`}
              >
                {r.text}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-2.5 pl-4 text-[11px] leading-snug text-muted-foreground">
          {l.foot}
        </p>
      </div>
    );
  }

  if (variant === 3) {
    return (
      <p className="mt-5 text-[14px] leading-relaxed text-foreground/90">
        <Emphasised text={l.lead} />
      </p>
    );
  }

  if (variant === 4) {
    return (
      <dl className="mt-5">
        {l.rows?.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-6 border-b border-border py-2 last:border-b-0"
          >
            <dt className="text-[12px] text-muted-foreground">{k}</dt>
            <dd className="text-right text-[13px] font-semibold leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
    );
  }

  if (variant === 5) {
    return (
      <div className="mt-5 border-l-2 border-brand pl-3">
        <p className="text-[15px] font-bold leading-snug">{l.lead}</p>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
      </div>
    );
  }

  if (variant === 6) {
    return (
      <div className="mt-5">
        <p className="text-[11px] font-medium tracking-wide text-brand">{l.over}</p>
        <p className="mt-1 text-[16px] font-bold leading-snug">{l.lead}</p>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
      </div>
    );
  }

  if (variant === 7) {
    return (
      <div className="mt-5 rounded-2xl bg-muted p-4">
        <p className="text-[11px] font-medium tracking-wide text-brand">{l.over}</p>
        <p className="mt-1 text-[16px] font-bold leading-snug">{l.lead}</p>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
      </div>
    );
  }

  if (variant === 8) {
    return (
      <div className="mt-5 rounded-2xl border border-border p-4">
        <p className="text-[11px] font-medium tracking-wide text-brand">{l.over}</p>
        <p className="mt-1 text-[16px] font-bold leading-snug">{l.lead}</p>
        <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
      </div>
    );
  }

  // variant 0 — lead line + fine print
  return (
    <div className="mt-5">
      <p className="text-[15px] font-semibold leading-snug">{l.lead}</p>
      <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">{l.sub}</p>
    </div>
  );
}
