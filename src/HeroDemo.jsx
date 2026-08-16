import { useEffect, useRef, useState } from "react";

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

const MOVE_MS = 920;
const HOLD_MS = 780;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export default function HeroDemo() {
  const [i, setI] = useState(0);
  const [ripples, setRipples] = useState(0);
  const cursorRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const node = cursorRef.current;
    if (!node) return undefined;

    let raf = 0;
    let start = performance.now();
    let moving = true;
    const from = { x: FRAMES[0].x, y: FRAMES[0].y };

    node.style.left = `${from.x}%`;
    node.style.top = `${from.y}%`;

    const tick = (now) => {
      const nextIndex = (indexRef.current + 1) % FRAMES.length;
      const next = FRAMES[nextIndex];
      const elapsed = now - start;

      if (moving) {
        const t = Math.min(1, elapsed / MOVE_MS);
        const e = easeInOutCubic(t);
        const x = from.x + (next.x - from.x) * e;
        const y = from.y + (next.y - from.y) * e;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;

        if (t >= 1) {
          moving = false;
          start = now;
          from.x = next.x;
          from.y = next.y;
          indexRef.current = nextIndex;
          setI(nextIndex);
          if (next.click) setRipples((n) => n + 1);
        }
      } else if (elapsed >= HOLD_MS) {
        moving = true;
        start = now;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const frame = FRAMES[i];

  return (
    <div className="overflow-hidden border border-line bg-panel">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2 font-mono text-[11px] text-mute">
        <span className="size-2 rounded-full bg-accent/80" />
        <span className="flex-1 truncate">staging.checkout · profile QA</span>
        <span className="text-accent">live intercept</span>
      </div>
      <img
        src="/riglet-lab.png"
        alt="Riglet lab: live page and intercepted PATCH /v1/cart"
        className="block w-full border-b border-line md:hidden"
      />
      <div className="hidden md:grid md:grid-cols-2">
        <div className="relative min-h-[240px] border-r border-line">
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
            ref={cursorRef}
            className="pointer-events-none absolute will-change-transform"
            style={{ left: "18%", top: "42%", transform: "translate(-50%, -50%)" }}
          >
            <svg viewBox="0 0 16 16" className="size-4 fill-accent">
              <path d="M1 1l5 13 2-5 5-2z" />
            </svg>
            {ripples > 0 ? (
              <span
                key={ripples}
                className="cursor-ripple absolute left-1.5 top-1.5 size-5 rounded-full border border-accent"
              />
            ) : null}
          </div>
        </div>
        <div className="min-h-[240px] p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-mute">
            PATCH /v1/cart
          </p>
          <pre
            key={`body-${i}`}
            className="panel-fade mt-3 overflow-auto font-mono text-[11px] leading-5 text-accent"
          >
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
          <p key={`log-${i}`} className="panel-fade mt-4 font-mono text-[11px] text-mute">
            agent › {frame.log}
          </p>
        </div>
      </div>
    </div>
  );
}
