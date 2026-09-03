import { useState } from "react";
import { announcements } from "./data";

export const announcementCaptions: Record<number, string> = {
  0: "A stack you tap through, with the next two peeking beneath so the count is physical.",
  1: "A paged carousel: one item fills the width, dots say how many are waiting.",
  2: "A one-line ticker that stays out of the way until it is opened.",
};

function Header({ index }: { index: number }) {
  return (
    <div className="mb-2 flex items-baseline justify-between px-1">
      <h2 className="text-[13px] font-bold">Announcements</h2>
      <span className="text-[11px] text-muted-foreground">
        {index + 1} of {announcements.length}
      </span>
    </div>
  );
}

/* 1 — peeking stack */
function AnnA() {
  const [i, setI] = useState(0);
  const a = announcements[i]!;
  return (
    <section>
      <Header index={i} />
      <div className="relative pb-3">
        <div className="absolute inset-x-4 bottom-0 top-3 rounded-2xl bg-muted" />
        <div className="absolute inset-x-2 bottom-1.5 top-1.5 rounded-2xl border border-border bg-card" />
        <button
          onClick={() => setI((v) => (v + 1) % announcements.length)}
          className="relative w-full rounded-2xl border border-border bg-card p-4 text-left"
        >
          <p className="text-[15px] font-bold leading-tight">{a.title}</p>
          <p className="mt-1 text-[13px] text-muted-foreground">{a.line}</p>
          <p className="mt-2 text-[11px] font-medium text-brand">Tap for the next one</p>
        </button>
      </div>
    </section>
  );
}

/* 2 — paged carousel */
function AnnB() {
  const [i, setI] = useState(0);
  return (
    <section>
      <Header index={i} />
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none]"
        onScroll={(e) => {
          const el = e.currentTarget;
          setI(Math.round(el.scrollLeft / (el.clientWidth - 8)));
        }}
      >
        {announcements.map((a) => (
          <article
            key={a.title}
            className="w-[calc(100%-8px)] shrink-0 snap-start rounded-2xl bg-muted p-4"
          >
            <p className="text-[15px] font-bold leading-tight">{a.title}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{a.line}</p>
          </article>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {announcements.map((a, n) => (
          <span
            key={a.title}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-4 bg-foreground" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* 3 — ticker that expands */
function AnnC() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const a = announcements[i]!;
  return (
    <section className="rounded-xl bg-foreground text-background">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left"
      >
        <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-brand-foreground">
          {announcements.length} new
        </span>
        <span className="flex-1 truncate text-[13px] font-semibold">{a.title}</span>
        <span className={`text-[11px] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <ul className="border-t border-background/20 px-3 pb-3 pt-1">
          {announcements.map((item, n) => (
            <li key={item.title} className="border-b border-background/10 py-2 last:border-b-0">
              <button className="text-left" onClick={() => setI(n)}>
                <p className="text-[13px] font-bold">{item.title}</p>
                <p className="text-[12px] opacity-70">{item.line}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function Announcements({ option }: { option: number }) {
  const all = [AnnA, AnnB, AnnC];
  const C = all[option] ?? AnnA;
  return <C />;
}
