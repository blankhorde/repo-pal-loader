import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { statusModel, playerStateLabels, type PlayerState } from "@/components/kweza/data";
import { StatusCard, statusCaptions } from "@/components/kweza/status";
import {
  spaceVariantLabels,
  spaceVariantCaptions,
} from "@/components/kweza/status-space";
import { Announcements, announcementCaptions } from "@/components/kweza/announcements";
import { Puzzles, puzzleCaptions } from "@/components/kweza/puzzles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kweza Home — design exploration" },
      {
        name: "description",
        content:
          "Interactive exploration of the Kweza home screen: status card, announcements and puzzle catalogue options across player states.",
      },
      { property: "og:title", content: "Kweza Home — design exploration" },
      {
        property: "og:description",
        content:
          "Compare status card, announcement and puzzle treatments for the Kweza mobile home screen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const compositions = [
  "Status, blitz, announcements, puzzles",
  "Blitz, status, announcements, puzzles",
  "Status, announcements, blitz, puzzles",
];
const compositionCaptions = [
  "The week reads first, the live event interrupts once, then the reasons to stay.",
  "The event takes the top strip because it expires; the week settles underneath it.",
  "Status then news stay compact so the puzzle set begins above the fold.",
];

function useCountdown() {
  const [s, setS] = useState(3 * 86400 + 1 * 3600 + 31 * 60 + 29);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d}d ${p(h)}:${p(m)}:${p(sec)}`;
}

function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1 rounded-xl bg-muted p-1">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => onChange(i)}
            className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
              i === value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Caption({ children }: { children: string }) {
  return (
    <p className="mt-1.5 px-1 text-[11px] italic leading-snug text-muted-foreground">
      {children}
    </p>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-foreground text-[13px] font-extrabold text-background">
        K
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-muted text-[13px] font-bold">
        E
      </div>
    </div>
  );
}

function Blitz() {
  return (
    <section className="flex h-[84px] items-center justify-between rounded-2xl bg-brand px-4 text-brand-foreground">
      <div>
        <p className="text-[14px] font-extrabold leading-tight">Blitz is live</p>
        <p className="text-[12px] opacity-90">Ends 8:00 PM · 214 playing</p>
      </div>
      <span className="rounded-lg bg-brand-foreground px-3.5 py-2 text-[13px] font-bold text-foreground">
        Enter
      </span>
    </section>
  );
}

function TabBar() {
  const icons = ["⌂", "🏆", "✿", "☺"];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4">
      <div className="pointer-events-auto flex h-[60px] items-center justify-around rounded-full bg-foreground px-2 text-background shadow-lg">
        {icons.map((ic, i) => (
          <span
            key={ic}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-[16px] ${
              i === 0 ? "bg-background text-foreground" : "opacity-60"
            }`}
          >
            {ic}
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const [comp, setComp] = useState(0);
  const [statusOpt, setStatusOpt] = useState(4);
  const [spaceVariant, setSpaceVariant] = useState(0);
  const [annOpt, setAnnOpt] = useState(0);
  const [puzOpt, setPuzOpt] = useState(0);
  const [state, setState] = useState<PlayerState>("ranked_paying");
  const [blitz, setBlitz] = useState(true);
  const countdown = useCountdown();
  const m = statusModel(state);

  const status = (
    <div>
      <StatusCard
        option={statusOpt}
        spaceVariant={spaceVariant}
        m={m}
        state={state}
        countdown={countdown}
      />
      <Caption>
        {statusOpt === 4
          ? `Option 5 · variant ${spaceVariantLabels[spaceVariant]} — ${spaceVariantCaptions[spaceVariant]}`
          : statusCaptions[statusOpt]!}
      </Caption>
    </div>
  );
  const ann = (
    <div>
      <Announcements option={annOpt} />
      <Caption>{announcementCaptions[annOpt]!}</Caption>
    </div>
  );
  const puz = (
    <div>
      <Puzzles option={puzOpt} state={state} />
      <Caption>{puzzleCaptions[puzOpt]!}</Caption>
    </div>
  );
  const blitzEl = blitz ? <Blitz /> : null;

  const order =
    comp === 0
      ? [status, blitzEl, ann, puz]
      : comp === 1
        ? [blitzEl, status, ann, puz]
        : [status, ann, blitzEl, puz];

  const states = Object.keys(playerStateLabels) as PlayerState[];

  return (
    <main className="min-h-screen bg-muted/40 pb-16">
      <header className="mx-auto max-w-[860px] px-4 pt-8">
        <h1 className="text-[22px] font-extrabold tracking-tight">
          Kweza home — design exploration
        </h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Every combination renders. Pick a composition, then a treatment per section.
        </p>
        <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2">
          <Segmented
            label="Page composition"
            options={["A", "B", "C"]}
            value={comp}
            onChange={setComp}
          />
          <Segmented
            label="Status card"
            options={["1", "2", "3", "4", "5"]}
            value={statusOpt}
            onChange={setStatusOpt}
          />
          <Segmented
            label="Option 5 — space under the meter"
            options={spaceVariantLabels}
            value={spaceVariant}
            onChange={setSpaceVariant}
          />
          <Segmented
            label="Announcements"
            options={["1", "2", "3"]}
            value={annOpt}
            onChange={setAnnOpt}
          />
          <Segmented
            label="Puzzles"
            options={["1", "2", "3"]}
            value={puzOpt}
            onChange={setPuzOpt}
          />
          <div className="sm:col-span-2">
            <Segmented
              label="Player state"
              options={states.map((s) => playerStateLabels[s])}
              value={states.indexOf(state)}
              onChange={(i) => setState(states[i]!)}
            />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <span className="text-[11px] font-medium text-muted-foreground">Blitz live</span>
            <button
              onClick={() => setBlitz((v) => !v)}
              className={`h-6 w-11 rounded-full p-0.5 transition-colors ${blitz ? "bg-brand" : "bg-border"}`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-card transition-transform ${blitz ? "translate-x-5" : ""}`}
              />
            </button>
            <span className="text-[11px] text-muted-foreground">{blitz ? "on" : "off"}</span>
          </div>
        </div>
        <p className="mt-2 px-1 text-[11px] italic text-muted-foreground">
          {compositionCaptions[comp]} — {compositions[comp]}.
        </p>
      </header>

      <div className="mt-6 flex justify-center px-4">
        <div className="relative w-[390px] overflow-hidden rounded-[28px] border border-border bg-background shadow-xl">
          <div className="h-[844px] overflow-y-auto">
            <TopBar />
            <div className="flex flex-col gap-5 px-4 pb-[100px]">
              {order.map((node, i) => (node ? <div key={i}>{node}</div> : null))}
            </div>
          </div>
          <TabBar />
        </div>
      </div>
    </main>
  );
}
