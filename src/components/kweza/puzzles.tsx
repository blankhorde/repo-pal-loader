import { puzzles, type Puzzle, type PlayerState } from "./data";

export const puzzleCaptions: Record<number, string> = {
  0: "A two-column board of tiles, each carrying today's state in the corner.",
  1: "Today's four ride a wide scroller; the rest of the catalogue sits quietly below.",
  2: "Today's set reads as a short worklist with the full catalogue behind one line.",
};

function ImageBlock({ p, className = "" }: { p: Puzzle; className?: string }) {
  if (!p.hasImage) {
    return (
      <div
        className={`flex items-center justify-center bg-foreground text-background ${className}`}
      >
        <span className="text-[20px] font-extrabold tracking-tight">
          {p.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-muted text-[11px] text-muted-foreground ${className}`}
    >
      image
    </div>
  );
}

function stateLabel(p: Puzzle, free: boolean) {
  if (p.today === "coming") return p.comingLabel ?? "Coming soon";
  if (free) return p.today === "completed" ? "Free play done" : "Free play";
  if (p.today === "completed") return `Done · +${p.points}`;
  return "Play";
}

function Badge({ p, free }: { p: Puzzle; free: boolean }) {
  const done = p.today === "completed";
  const coming = p.today === "coming";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
        coming
          ? "bg-muted text-muted-foreground"
          : done
            ? "bg-foreground text-background"
            : "bg-brand text-brand-foreground"
      }`}
    >
      {stateLabel(p, free)}
    </span>
  );
}

function AllPuzzles({ label = "All puzzles · 12" }: { label?: string }) {
  return (
    <button className="mt-3 flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-[13px] font-semibold">
      {label}
      <span aria-hidden="true">›</span>
    </button>
  );
}

function Heading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between px-1">
      <h2 className="text-[13px] font-bold">{title}</h2>
      {note && <span className="text-[11px] text-muted-foreground">{note}</span>}
    </div>
  );
}

/* 1 — 2-column grid */
function PuzA({ free }: { free: boolean }) {
  return (
    <section>
      <Heading title="Puzzles today" note="4 live" />
      <div className="grid grid-cols-2 gap-3">
        {puzzles.map((p) => (
          <article key={p.name} className="overflow-hidden rounded-2xl bg-card border border-border">
            <div className="relative">
              <ImageBlock p={p} className="h-24 w-full" />
              <div className="absolute left-2 top-2">
                <Badge p={p} free={free} />
              </div>
            </div>
            <div className="p-3">
              <p className="text-[14px] font-bold leading-tight">{p.name}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">
                {p.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>
      <AllPuzzles />
    </section>
  );
}

/* 2 — horizontal scroller of large tiles */
function PuzB({ free }: { free: boolean }) {
  const [today, rest] = [puzzles.slice(0, 3), puzzles.slice(3)];
  return (
    <section>
      <Heading title="Play today" note="Swipe" />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {today.map((p) => (
          <article key={p.name} className="w-[220px] shrink-0">
            <div className="relative overflow-hidden rounded-2xl">
              <ImageBlock p={p} className="h-32 w-full" />
              <div className="absolute bottom-2 left-2">
                <Badge p={p} free={free} />
              </div>
            </div>
            <p className="mt-2 text-[15px] font-bold leading-tight">{p.name}</p>
            <p className="text-[12px] text-muted-foreground">{p.blurb}</p>
          </article>
        ))}
      </div>
      <div className="mt-2 divide-y divide-border">
        {rest.map((p) => (
          <div key={p.name} className="flex items-center gap-3 py-3">
            <ImageBlock p={p} className="h-11 w-11 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold leading-tight">{p.name}</p>
              <p className="truncate text-[12px] text-muted-foreground">{p.blurb}</p>
            </div>
            <Badge p={p} free={free} />
          </div>
        ))}
      </div>
      <AllPuzzles label="Everything else · 8 more" />
    </section>
  );
}

/* 3 — today's set worklist */
function PuzC({ free }: { free: boolean }) {
  const live = puzzles.filter((p) => p.today !== "coming");
  const done = live.filter((p) => p.today === "completed").length;
  const soon = puzzles.filter((p) => p.today === "coming");
  return (
    <section>
      <Heading title="Today's set" note={`${done} of ${live.length} done`} />
      <div className="overflow-hidden rounded-2xl bg-muted">
        {live.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-3 border-b border-border bg-card px-3 py-3 last:border-b-0"
          >
            <ImageBlock p={p} className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold leading-tight">{p.name}</p>
              <p className="truncate text-[12px] text-muted-foreground">{p.blurb}</p>
            </div>
            <Badge p={p} free={free} />
          </div>
        ))}
      </div>
      <div className="mt-3">
        <p className="px-1 text-[11px] text-muted-foreground">Next up</p>
        <div className="mt-1 flex gap-2">
          {soon.map((p) => (
            <div
              key={p.name}
              className="flex flex-1 items-center gap-2 rounded-xl border border-dashed border-border px-3 py-2"
            >
              <ImageBlock p={p} className="h-8 w-8 shrink-0 rounded-md" />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.comingLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AllPuzzles />
    </section>
  );
}

export function Puzzles({ option, state }: { option: number; state: PlayerState }) {
  const free = state === "free_player";
  const all = [PuzA, PuzB, PuzC];
  const C = all[option] ?? PuzA;
  return <C free={free} />;
}
