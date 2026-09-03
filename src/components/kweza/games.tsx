import { activityLabel, comingGames, featuredGames, games, liveGames, type Game } from "./games-data";

/* ---------- shared pieces ---------- */

export function Cover({ g, className = "" }: { g: Game; className?: string }) {
  if (!g.hasImage) {
    return (
      <div
        className={`flex items-center justify-center bg-foreground text-background ${className}`}
        aria-hidden="true"
      >
        <span className="text-[18px] font-extrabold tracking-tight">
          {g.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center bg-muted text-[11px] text-muted-foreground ${className}`}
      aria-hidden="true"
    >
      image
    </div>
  );
}

function Chip({ g, free }: { g: Game; free: boolean }) {
  const label = activityLabel(g, free);
  if (!label) return null;
  return (
    <span
      className={`inline-block max-w-full truncate rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        g.live ? "bg-background/90 text-foreground" : "bg-muted text-muted-foreground"
      }`}
    >
      {label}
    </span>
  );
}

function AllGamesButton({ onOpen, label = "All games" }: { onOpen: () => void; label?: string }) {
  return (
    <button
      onClick={onOpen}
      className="mt-3 flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-[13px] font-semibold"
    >
      {label} · {games.length}
      <span aria-hidden="true">›</span>
    </button>
  );
}

function Heading({
  title,
  action,
  onOpen,
}: {
  title: string;
  action?: string;
  onOpen?: () => void;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between px-1">
      <h2 className="text-[13px] font-bold">{title}</h2>
      {action && onOpen && (
        <button onClick={onOpen} className="text-[11px] font-semibold text-muted-foreground">
          {action}
        </button>
      )}
    </div>
  );
}

/* ---------- Part 1: Home section options ---------- */

export const homeCaptions = [
  "Large cover tiles ride a horizontal scroller, so any number of featured games reads as one swipeable shelf.",
  "A two-column grid of square covers gives every featured game the same weight, with all games as a full-width row underneath.",
  "The first game takes a wide hero cover and the rest follow as a compact list, so today's headline game leads.",
];

export const homeLabels = ["Scroller", "Grid", "Hero + list"];

/* 1 — horizontal scroller */
function HomeA({ count, free, onOpen }: HomeProps) {
  const list = featuredGames(count);
  return (
    <section>
      <Heading title="Games" action="All games" onOpen={onOpen} />
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {list.map((g) => (
          <article key={g.name} className="w-[168px] shrink-0">
            <div className="relative overflow-hidden rounded-2xl">
              <Cover g={g} className="h-[124px] w-full" />
              <div className="absolute bottom-2 left-2 right-2">
                <Chip g={g} free={free} />
              </div>
            </div>
            <p className="mt-2 truncate text-[14px] font-bold leading-tight">{g.name}</p>
            <p className="truncate text-[12px] text-muted-foreground">{g.blurb}</p>
          </article>
        ))}
      </div>
      <AllGamesButton onOpen={onOpen} />
    </section>
  );
}

/* 2 — two-column grid */
function HomeB({ count, free, onOpen }: HomeProps) {
  const list = featuredGames(count);
  return (
    <section>
      <Heading title="Games" />
      <div className="grid grid-cols-2 gap-3">
        {list.map((g) => (
          <article key={g.name} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative">
              <Cover g={g} className="aspect-square w-full" />
              <div className="absolute left-2 top-2 right-2">
                <Chip g={g} free={free} />
              </div>
            </div>
            <div className="p-2.5">
              <p className="truncate text-[13px] font-bold leading-tight">{g.name}</p>
              <p className="line-clamp-2 text-[11px] text-muted-foreground">{g.blurb}</p>
            </div>
          </article>
        ))}
      </div>
      <AllGamesButton onOpen={onOpen} />
    </section>
  );
}

/* 3 — hero + compact list */
function HomeC({ count, free, onOpen }: HomeProps) {
  const list = featuredGames(count);
  const [hero, ...rest] = list;
  if (!hero) return null;
  return (
    <section>
      <Heading title="Games" action="All games" onOpen={onOpen} />
      <article className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative">
          <Cover g={hero} className="h-[150px] w-full" />
          <div className="absolute bottom-2 left-2 right-2">
            <Chip g={hero} free={free} />
          </div>
        </div>
        <div className="p-3">
          <p className="text-[15px] font-bold leading-tight">{hero.name}</p>
          <p className="text-[12px] text-muted-foreground">{hero.blurb}</p>
        </div>
      </article>
      <div className="mt-2 divide-y divide-border">
        {rest.map((g) => (
          <div key={g.name} className="flex items-center gap-3 py-2.5">
            <Cover g={g} className="h-11 w-11 shrink-0 overflow-hidden rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold leading-tight">{g.name}</p>
              <p className="truncate text-[12px] text-muted-foreground">{g.blurb}</p>
            </div>
            <Chip g={g} free={free} />
          </div>
        ))}
      </div>
      <AllGamesButton onOpen={onOpen} />
    </section>
  );
}

type HomeProps = { count: number; free: boolean; onOpen: () => void };

export function GamesHome(props: HomeProps & { option: number }) {
  const { option, ...rest } = props;
  const all = [HomeA, HomeB, HomeC];
  const C = all[option] ?? HomeA;
  return <C {...rest} />;
}

/* ---------- Part 2: All games experiences ---------- */

export const allCaptions = [
  "A sheet slides up over a dimmed Home with a drag handle, live games first and coming soon below.",
  "A full page takes over the screen with a back control in its own header, and games grouped by category.",
  "The section expands in place on Home, pushing the rest of the page down, and collapses from the same line.",
];

export const allLabels = ["Sheet", "Full page", "Expand in place"];

function CatalogueRow({ g, free }: { g: Game; free: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Cover g={g} className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-bold leading-tight">{g.name}</p>
        <p className="truncate text-[12px] text-muted-foreground">{g.blurb}</p>
      </div>
      <div className="shrink-0 text-right">
        <Chip g={g} free={free} />
      </div>
    </div>
  );
}

function CatalogueTile({ g, free }: { g: Game; free: boolean }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-border bg-card ${g.live ? "" : "opacity-80"}`}
    >
      <div className="relative">
        <Cover g={g} className="aspect-[4/3] w-full" />
        <div className="absolute left-2 top-2 right-2">
          <Chip g={g} free={free} />
        </div>
      </div>
      <div className="p-2.5">
        <p className="truncate text-[13px] font-bold leading-tight">{g.name}</p>
        <p className="truncate text-[11px] text-muted-foreground">{g.blurb}</p>
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-2 mt-4 px-1 text-[11px] font-semibold text-muted-foreground">{children}</p>;
}

/* 1 — bottom sheet over dimmed Home */
function AllSheet({ free, onClose }: AllProps) {
  return (
    <div className="absolute inset-0 z-20">
      <button
        aria-label="Close all games"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40"
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[78%] overflow-y-auto rounded-t-3xl bg-background pb-6">
        <div className="sticky top-0 bg-background pt-2">
          <button
            onClick={onClose}
            aria-label="Close all games"
            className="mx-auto block h-1.5 w-10 rounded-full bg-border"
          />
          <div className="flex items-baseline justify-between px-4 pb-2 pt-3">
            <h2 className="text-[15px] font-extrabold">All games</h2>
            <span className="text-[11px] text-muted-foreground">{games.length} in total</span>
          </div>
        </div>
        <div className="px-4">
          <p className="px-1 text-[11px] font-semibold text-muted-foreground">Live now</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {liveGames.map((g) => (
              <CatalogueTile key={g.name} g={g} free={free} />
            ))}
          </div>
          <SectionLabel>Coming soon</SectionLabel>
          <div className="divide-y divide-border">
            {comingGames.map((g) => (
              <CatalogueRow key={g.name} g={g} free={free} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2 — full page with back control, grouped by category */
function AllPage({ free, onClose }: AllProps) {
  const cats = Array.from(new Set(games.map((g) => g.category)));
  return (
    <div className="absolute inset-0 z-20 overflow-y-auto bg-background pb-24">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-4 py-3">
        <button
          onClick={onClose}
          aria-label="Back to home"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-[15px]"
        >
          ‹
        </button>
        <h2 className="text-[15px] font-extrabold">All games</h2>
        <span className="ml-auto text-[11px] text-muted-foreground">{games.length} in total</span>
      </div>
      <div className="px-4">
        {cats.map((c) => (
          <div key={c}>
            <SectionLabel>{c}</SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              {games
                .filter((g) => g.category === c)
                .map((g) => (
                  <CatalogueTile key={g.name} g={g} free={free} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3 — expand in place */
export function AllExpanded({ free, onClose }: AllProps) {
  return (
    <section className="rounded-2xl bg-muted/60 p-3">
      <div className="mb-2 flex items-baseline justify-between px-1">
        <h2 className="text-[13px] font-bold">All games · {games.length}</h2>
        <button onClick={onClose} className="text-[11px] font-semibold text-muted-foreground">
          Show less
        </button>
      </div>
      <p className="px-1 text-[11px] font-semibold text-muted-foreground">Live now</p>
      <div className="mt-2 divide-y divide-border rounded-2xl bg-card px-3">
        {liveGames.map((g) => (
          <CatalogueRow key={g.name} g={g} free={free} />
        ))}
      </div>
      <p className="mt-3 px-1 text-[11px] font-semibold text-muted-foreground">Coming soon</p>
      <div className="mt-2 divide-y divide-border rounded-2xl bg-card px-3">
        {comingGames.map((g) => (
          <CatalogueRow key={g.name} g={g} free={free} />
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-3 flex w-full items-center justify-center rounded-xl border border-border py-3 text-[13px] font-semibold"
      >
        Back to home
      </button>
    </section>
  );
}

type AllProps = { free: boolean; onClose: () => void };

/** Overlay variants only (sheet, full page). Option 3 renders inline on Home. */
export function GamesAllOverlay({ option, ...rest }: AllProps & { option: number }) {
  if (option === 0) return <AllSheet {...rest} />;
  if (option === 1) return <AllPage {...rest} />;
  return null;
}
