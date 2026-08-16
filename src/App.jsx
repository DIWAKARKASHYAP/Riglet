import { useState } from "react";
import HeroDemo from "./HeroDemo.jsx";
import { GITHUB_URL } from "./constants.js";
import { submitWaitlist } from "./waitlist.js";

const FEATURES = [
  {
    title: "Full API control",
    body: "Intercept, mock, rewrite any request or response before it hits the wire.",
  },
  {
    title: "Agentic scraping",
    body: "Point it at a site, describe what you want, get structured data out.",
  },
  {
    title: "Programmatic input",
    body: "Native mouse and keyboard access, not simulated DOM events.",
  },
  {
    title: "Scriptable automation",
    body: "Record, edit, and replay flows as code — not a brittle recorder.",
  },
  {
    title: "Junior-assistant mode",
    body: "Plain-English instructions. It executes step by step and shows its reasoning.",
  },
  {
    title: "Zero permission prompts",
    body: "Grant access once. It does not ask again for every click.",
  },
];

function IconBox() {
  return (
    <span className="mb-4 block size-7 border border-line">
      <span className="block size-full origin-top-left scale-75 border-r border-b border-accent" />
    </span>
  );
}

function Waitlist() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "");
    setBusy(true);
    setMsg("");
    try {
      await submitWaitlist(email);
      setErr(false);
      setMsg("On the list. We’ll mail you when macOS and Linux ship.");
      event.currentTarget.reset();
    } catch (error) {
      setErr(true);
      setMsg(error instanceof Error ? error.message : "Waitlist submission failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex max-w-md flex-wrap gap-2">
      <label className="sr-only" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-w-0 flex-1 border border-line bg-void px-3 py-2 font-mono text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={busy}
        className="border border-accent bg-accent px-3 py-2 font-mono text-sm text-void disabled:opacity-50"
      >
        Join waitlist
      </button>
      {msg ? (
        <p
          className={`basis-full font-mono text-xs ${err ? "text-red-400" : "text-accent"}`}
        >
          {msg}
        </p>
      ) : null}
    </form>
  );
}

export default function App() {
  return (
    <div className="grid-bg min-h-screen">
      <header className="sticky top-0 z-20 flex items-center gap-6 border-b border-line bg-void/90 px-5 py-3 backdrop-blur md:px-8">
        <a href="#top" className="font-mono text-lg tracking-tight">
          riglet
        </a>
        <nav className="ml-auto hidden gap-5 font-mono text-xs text-mute md:flex">
          <a href="#compare">Compare</a>
          <a href="#features">Capabilities</a>
          <a href="#script">API</a>
          <a href="#download">Download</a>
        </nav>
        <a
          href="#download"
          className="border border-accent bg-accent px-3 py-1.5 font-mono text-xs text-void"
        >
          Download for Windows
        </a>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-2 md:items-center md:px-8 md:py-12 lg:min-h-[calc(100vh-56px)]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              windows · no sandbox theater
            </p>
            <h1 className="mt-3 font-mono text-5xl tracking-tight md:text-7xl">
              riglet
            </h1>
            <p className="mt-4 max-w-md text-lg leading-snug text-mute">
              The browser that does what you tell it. No sandbox, no permission
              dialogs, no limits.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mute">
              A browser with API control, agentic scraping, and full
              mouse/keyboard access — built for people who test and build the
              web, not just browse it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#download"
                className="border border-accent bg-accent px-4 py-2 font-mono text-sm text-void"
              >
                Download for Windows
              </a>
              <a
                href={GITHUB_URL}
                className="border border-line px-4 py-2 font-mono text-sm text-ink"
              >
                Read the docs
              </a>
            </div>
          </div>
          <HeroDemo />
        </section>

        <section id="compare" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <h2 className="font-mono text-2xl md:text-3xl">Not another extension</h2>
            <p className="mt-2 max-w-xl text-sm text-mute">
              Stop wiring Postman to a headed browser to a Python script. One
              process. Your machine. Your rules.
            </p>
            <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
              <div className="bg-void p-6">
                <p className="font-mono text-xs text-mute">Postman</p>
                <p className="mt-3 text-sm">Great for APIs. Blind to the page.</p>
              </div>
              <div className="bg-void p-6">
                <p className="font-mono text-xs text-mute">Playwright / Selenium</p>
                <p className="mt-3 text-sm">Great for automation. No live API control.</p>
              </div>
              <div className="bg-void p-6">
                <p className="font-mono text-xs text-accent">Riglet</p>
                <p className="mt-3 text-sm">Both. One browser. No context switch.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <h2 className="font-mono text-2xl md:text-3xl">Raw control</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article key={f.title}>
                  <IconBox />
                  <h3 className="font-mono text-sm">{f.title}</h3>
                  <p className="mt-2 text-sm text-mute">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <h2 className="font-mono text-2xl md:text-3xl">How it works</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              <li>
                <span className="font-mono text-accent">01</span>
                <p className="mt-2 font-mono">Open any site</p>
                <p className="mt-1 text-sm text-mute">
                  Isolated profile. Cookies stay in that profile.
                </p>
              </li>
              <li>
                <span className="font-mono text-accent">02</span>
                <p className="mt-2 font-mono">Tell it what to do</p>
                <p className="mt-1 text-sm text-mute">
                  Plain English or a script. Same engine.
                </p>
              </li>
              <li>
                <span className="font-mono text-accent">03</span>
                <p className="mt-2 font-mono">Watch it act</p>
                <p className="mt-1 text-sm text-mute">
                  Every request, click, and keystroke visible and editable.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="script" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <h2 className="font-mono text-2xl md:text-3xl">Script it like you mean it</h2>
            <p className="mt-2 text-sm text-mute">
              Intercept the wire. Then hand the page to an agent.
            </p>
            <pre className="mt-8 overflow-x-auto border border-line bg-panel p-5 font-mono text-[13px] leading-6 text-ink">
              <code>{`riglet.intercept('/api/checkout')
  .mock({ status: 200, body: { success: true } });

riglet.agent.run("log into the dashboard and export last month's invoices");`}</code>
            </pre>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <h2 className="font-mono text-2xl md:text-3xl">Who it’s for</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <article>
                <p className="font-mono text-sm">QA engineers</p>
                <p className="mt-2 text-sm text-mute">Replace four tools with one.</p>
              </article>
              <article>
                <p className="font-mono text-sm">Backend devs</p>
                <p className="mt-2 text-sm text-mute">
                  Debug frontend/API mismatches without leaving the browser.
                </p>
              </article>
              <article>
                <p className="font-mono text-sm">Growth / data</p>
                <p className="mt-2 text-sm text-mute">
                  Scrape and automate without writing boilerplate.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="download" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
              windows only · 0.1.0-alpha · ~48 MB
            </p>
            <h2 className="mt-3 font-mono text-2xl md:text-3xl">
              Install it. Point it. Don’t babysit it.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GITHUB_URL}
                className="border border-accent bg-accent px-4 py-2 font-mono text-sm text-void"
              >
                Download for Windows
              </a>
              <a href={GITHUB_URL} className="border border-line px-4 py-2 font-mono text-sm">
                GitHub
              </a>
            </div>
            <p className="mt-8 font-mono text-sm text-mute">
              macOS and Linux — join the waitlist
            </p>
            <Waitlist />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-8 font-mono text-xs text-mute md:px-8">
          <span className="text-ink">riglet</span>
          <a href={GITHUB_URL}>GitHub</a>
          <a href={GITHUB_URL}>Docs</a>
          <a href={GITHUB_URL}>Changelog</a>
          <span className="md:ml-auto">MIT</span>
        </div>
      </footer>
    </div>
  );
}
