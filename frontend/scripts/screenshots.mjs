/**
 * Captures the README screenshots.
 *
 *   npm run build
 *   npx playwright install chromium   # once
 *   npm run screenshots
 *
 * Starts the production server on its own port, walks the key pages in light
 * and dark, and writes PNGs to docs/screenshots/.
 */
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const FRONTEND = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(FRONTEND, "..", "docs", "screenshots");
const PORT = 3211;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1440, height: 900 };

/** Pages to capture. `full: true` grabs the whole scrollable page. */
const PAGES = [
  { name: "home", path: "/", full: true },
  { name: "books", path: "/books" },
  { name: "book-detail", path: "/books/frankenstein", full: true },
  { name: "shelf", path: "/shelf" },
  { name: "stats", path: "/stats" },
];

const THEMES = ["light", "dark"];

/** Favourites and comments so the shelf screenshot is not an empty state. */
const DEMO_STATE = {
  state: {
    favourites: ["frankenstein", "dracula", "the-time-machine", "moby-dick", "we", "middlemarch"],
    status: {
      "pride-and-prejudice": "reading",
      "the-great-gatsby": "read",
      "crime-and-punishment": "want",
    },
    comments: {},
  },
  version: 0,
};

function startServer() {
  const server = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    { cwd: FRONTEND, stdio: "ignore", shell: process.platform === "win32" }
  );
  return server;
}

async function waitForServer(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(ORIGIN, { signal: AbortSignal.timeout(2000) });
      if (response.ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Server did not come up on ${ORIGIN} within ${timeoutMs}ms`);
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const server = startServer();
  const shutdown = () => server.kill();
  process.on("exit", shutdown);
  process.on("SIGINT", () => { shutdown(); process.exit(1); });

  try {
    await waitForServer();
    const browser = await chromium.launch();

    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: VIEWPORT,
        deviceScaleFactor: 2,
        colorScheme: theme,
      });

      // next-themes reads `theme` from localStorage; the store key seeds the
      // shelf so its screenshot shows a populated shelf rather than empty tabs.
      await context.addInitScript(
        ([themeName, state]) => {
          localStorage.setItem("theme", themeName);
          localStorage.setItem("virtual-library", state);
          localStorage.setItem("virtual-library:kbar-hint-dismissed", "1");
        },
        [theme, JSON.stringify(DEMO_STATE)]
      );

      const page = await context.newPage();

      for (const spec of PAGES) {
        await page.goto(`${ORIGIN}${spec.path}`, { waitUntil: "networkidle" });
        // Let entry animations and chart transitions settle.
        await page.waitForTimeout(900);

        const file = path.join(OUT_DIR, `${spec.name}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: Boolean(spec.full) });
        console.log(`captured ${path.relative(process.cwd(), file)}`);
      }

      await context.close();
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
