import type { PlayerState, StatusModel } from "./data";
import { StatusSpace } from "./status-space";

export const statusOptionLabels = ["1", "2", "3", "4", "5"];
export const statusCaptions: Record<number, string> = {
  0: "A single quiet panel: position and points read first, then one line about what would change it.",
  1: "A receipt of plain-language lines with no box, so the week reads as facts rather than a widget.",
  2: "A dark plate carries the position and the countdown; the pale shelf under it carries what is next.",
  3: "The whole thing is written as a sentence, with the numbers set large inside the text.",
  4: "A band meter shows where the paid positions end and where the player sits against them; the space under it is switchable.",
};

type Props = {
  m: StatusModel;
  state: PlayerState;
  countdown: string;
};

function Streak({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
      <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
        <path
          d="M5 0C5 3 1 3.5 1 7a4 4 0 108 0c0-2-1.5-3-2-4.5C6.5 4 5 4 5 0z"
          fill="currentColor"
        />
      </svg>
      {n} day streak
    </span>
  );
}

function Action({ label }: { label: string | null }) {
  if (!label) return null;
  return (
    <button className="mt-4 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground">
      {label}
    </button>
  );
}

function Countdown({ value, muted = false }: { value: string; muted?: boolean }) {
  return (
    <span
      className={`font-mono text-[12px] tabular-nums ${muted ? "text-muted-foreground" : ""}`}
    >
      {value} left
    </span>
  );
}

/* 1 — panel */
function StatusA({ m, countdown }: Props) {
  return (
    <section className="rounded-2xl bg-card p-4 shadow-[0_1px_0_0_var(--color-border),0_8px_24px_-18px_oklch(0_0_0/0.5)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] text-muted-foreground">This week</p>
          <p className="mt-1 text-[22px] font-extrabold leading-tight">{m.headline}</p>
        </div>
        {m.points && (
          <div className="text-right">
            <p className="text-[22px] font-extrabold leading-tight tabular-nums">
              {m.points}
            </p>
            <p className="text-[11px] text-muted-foreground">points</p>
          </div>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-snug text-muted-foreground">{m.support}</p>

      {m.prizeLabel && (
        <p className="mt-3 inline-block rounded-lg bg-brand-soft px-2.5 py-1 text-[13px] font-semibold text-foreground">
          {m.prizeCaption}: {m.prizeLabel}
        </p>
      )}

      {m.progressCaption && (
        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand"
              style={{ width: `${Math.max(m.progress * 100, 3)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[12px] font-medium">
              {m.progressCaption}
              {m.nextPrize ? ` · pays ${m.nextPrize}` : ""}
            </span>
          </div>
        </div>
      )}

      <Action label={m.button} />

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <Streak n={m.streak} />
        <Countdown value={countdown} muted />
      </div>
    </section>
  );
}

/* 2 — receipt */
function StatusB({ m, countdown }: Props) {
  const rows: Array<[string, string]> = [];
  if (m.rank) rows.push(["Your position", `${m.rank}${ordinal(m.rank)}`]);
  if (m.points) rows.push(["Points this week", m.points]);
  rows.push([m.prizeCaption ?? "This week", m.prizeLabel ?? "—"]);
  if (m.nextLabel) rows.push(["Next", m.nextLabel + (m.nextPrize ? ` · ${m.nextPrize}` : "")]);

  return (
    <section className="border-l-2 border-foreground pl-4">
      <p className="text-[22px] font-extrabold leading-tight">{m.headline}</p>
      <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{m.support}</p>
      <dl className="mt-3">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between gap-4 border-b border-border py-2 last:border-b-0"
          >
            <dt className="text-[12px] text-muted-foreground">{k}</dt>
            <dd className="text-right text-[13px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <Action label={m.button} />
      <div className="mt-3 flex items-center justify-between">
        <Streak n={m.streak} />
        <Countdown value={countdown} muted />
      </div>
    </section>
  );
}

/* 3 — dark plate + shelf */
function StatusC({ m, countdown }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl">
      <div className="bg-foreground px-4 py-4 text-background">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] opacity-70">This week</p>
            <p className="text-[26px] font-extrabold leading-tight">{m.headline}</p>
          </div>
          {m.points && (
            <p className="text-[13px] font-semibold tabular-nums opacity-80">
              {m.points} pts
            </p>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between opacity-80">
          <Streak n={m.streak} />
          <Countdown value={countdown} />
        </div>
      </div>
      <div className="bg-muted px-4 py-3">
        <p className="text-[13px] font-semibold">
          {m.prizeLabel ? `${m.prizeCaption}: ${m.prizeLabel}` : m.prizeCaption}
        </p>
        {m.nextLabel && (
          <p className="mt-1 text-[13px] text-muted-foreground">
            {m.nextLabel}
            {m.nextPrize ? ` — that position pays ${m.nextPrize}` : ""}
          </p>
        )}
        <Action label={m.button} />
      </div>
    </section>
  );
}

/* 4 — sentence first */
function StatusD({ m, countdown }: Props) {
  return (
    <section className="px-1">
      <p className="text-[19px] font-medium leading-relaxed">
        {m.rank ? (
          <>
            You are{" "}
            <span className="text-[26px] font-extrabold">
              {m.rank}
              {ordinal(m.rank)}
            </span>{" "}
            with{" "}
            <span className="text-[26px] font-extrabold tabular-nums">{m.points}</span>{" "}
            points.{" "}
          </>
        ) : (
          <>
            <span className="font-extrabold">{m.headline}.</span>{" "}
          </>
        )}
        <span className="text-muted-foreground">{m.support}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.prizeLabel && (
          <span className="rounded-full bg-brand-soft px-3 py-1 text-[12px] font-semibold">
            {m.prizeCaption}: {m.prizeLabel}
          </span>
        )}
        {m.nextLabel && (
          <span className="rounded-full bg-muted px-3 py-1 text-[12px] font-medium">
            {m.nextLabel}
            {m.nextPrize ? ` · ${m.nextPrize}` : ""}
          </span>
        )}
      </div>
      <Action label={m.button} />
      <div className="mt-3 flex items-center justify-between">
        <Streak n={m.streak} />
        <Countdown value={countdown} muted />
      </div>
    </section>
  );
}

/* 5 — band meter, long prize labels */
function StatusE({ m, state, countdown, spaceVariant = 0 }: Props & { spaceVariant?: number }) {
  const pct = Math.max(m.progress * 100, 4);
  return (
    <section className="rounded-2xl border border-border p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[17px] font-bold">{m.headline}</p>
        {m.points && (
          <p className="text-[13px] font-semibold tabular-nums text-muted-foreground">
            {m.points} pts
          </p>
        )}
      </div>

      {state !== "free_player" && (
      <div className="mt-4">
        <div className="relative h-2 w-full rounded-full bg-muted">
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
          <div
            className="absolute -top-1 h-4 w-0.5 bg-foreground"
            style={{ left: `${state === "ranked_paying" ? 88 : 70}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>Where you are</span>
          <span>Paid positions</span>
        </div>
      </div>
      )}

      <StatusSpace variant={spaceVariant} state={state} />

      <Action label={m.button} />
      <div className="mt-3 flex items-center justify-between">
        <Streak n={m.streak} />
        <Countdown value={countdown} muted />
      </div>
    </section>
  );
}

function ordinal(rank: string) {
  const n = Number(rank);
  if (n % 100 >= 11 && n % 100 <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

export function StatusCard({
  option,
  spaceVariant = 0,
  ...p
}: Props & { option: number; spaceVariant?: number }) {
  if (option === 4) return <StatusE {...p} spaceVariant={spaceVariant} />;
  const all = [StatusA, StatusB, StatusC, StatusD];
  const C = all[option] ?? StatusA;
  return <C {...p} />;
}
