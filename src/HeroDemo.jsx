import { useEffect, useState } from "react";

const FRAMES = [
  {
    x: 18,
    y: 42,
    click: false,
    log: "observe checkout · 6 refs",
    body: { sku: "2291", taxExempt: false },
  },
  {
    x: 72,
    y: 58,
    click: false,
    log: "intercept PATCH /v1/cart",
    body: { sku: "2291", taxExempt: false },
  },
  {
    x: 72,
    y: 58,
    click: true,
    log: "rewrite body.taxExempt = true",
    body: { sku: "2291", taxExempt: true },
  },
  {
    x: 28,
    y: 78,
    click: true,
    log: "click @e4 Place order · waiting confirm",
    body: { sku: "2291", taxExempt: true, status: "held" },
  },
];

export default function HeroDemo() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 1600);
    return () => clearInterval(id);
  }, []);

  const frame = FRAMES[i];

  return (
    <div className="border border-line bg-panel overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2 font-mono text-[11px] text-mute">
        <span className="size-2 rounded-full bg-accent/80" />
        <span className="flex-1 truncate">staging.checkout · profile QA</span>
        <span className="text-accent">live intercept</span>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="relative hidden min-h-[240px] border-b border-line md:block md:border-b-0 md:border-r">
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
              live page
            </p>
            <p className="mt-6 font-mono text-xs text-mute">SKU-2291</p>
            <p className="font-mono text-3xl">$64.00</p>
            <button
              type="button"
              className="mt-5 border border-ink px-3 py-1.5 font-mono text-xs"
            >
              Place order
            </button>
          </div>
          <div
            className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-300 ease-linear"
            style={{ left: `${frame.x}%`, top: `${frame.y}%` }}
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-accent drop-shadow">
              <path d="M1 1l5 13 2-5 5-2z" />
            </svg>
            {frame.click ? (
              <span className="absolute left-1 top-1 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70" />
            ) : null}
          </div>
        </div>
        <div className="min-h-[240px] p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
            PATCH /v1/cart
          </p>
          <pre className="mt-3 overflow-auto font-mono text-[11px] leading-5 text-accent">
            {JSON.stringify(
              {
                method: "PATCH",
                path: "/v1/cart",
                body: frame.body,
              },
              null,
              2,
            )}
          </pre>
          <p className="mt-4 font-mono text-[11px] text-mute">agent › {frame.log}</p>
        </div>
      </div>
    </div>
  );
}
