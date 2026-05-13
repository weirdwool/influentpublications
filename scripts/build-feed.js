#!/usr/bin/env node
/**
 * Fetches external JSON feeds from Influent Traveler and Influent Glamour,
 * aggregates them into a single public/feed.json served from the same domain.
 *
 * Run: node scripts/build-feed.js
 * Runs automatically via the "prebuild" npm script.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TRAVELER_URL = "https://influenttraveler.com/magazines.json";
const GLAMOUR_URL = "https://influentglamour.com/covers.json";

const OUT = path.resolve(__dirname, "..", "public", "feed.json");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const feed = {
    generatedAt: new Date().toISOString(),
    traveler: { magazines: [] },
    glamour: { covers: [], basePath: "" },
  };

  const results = await Promise.allSettled([
    fetchJson(TRAVELER_URL),
    fetchJson(GLAMOUR_URL),
  ]);

  // Traveler
  if (results[0].status === "fulfilled") {
    const data = results[0].value;
    if (Array.isArray(data)) {
      feed.traveler.magazines = data;
    } else if (data && typeof data === "object") {
      const key = ["magazines", "pastIssues", "issues", "items"].find(
        (k) => Array.isArray(data[k])
      );
      feed.traveler.magazines = key ? data[key] : [];
    }
    console.log(`  ✓ Traveler: ${feed.traveler.magazines.length} magazines`);
  } else {
    console.warn(`  ✗ Traveler fetch failed: ${results[0].reason?.message}`);
  }

  // Glamour
  if (results[1].status === "fulfilled") {
    const data = results[1].value;
    feed.glamour.covers = data.covers ?? [];
    feed.glamour.basePath = data.basePath ?? "";
    console.log(`  ✓ Glamour: ${feed.glamour.covers.length} covers`);
  } else {
    console.warn(`  ✗ Glamour fetch failed: ${results[1].reason?.message}`);
  }

  fs.writeFileSync(OUT, JSON.stringify(feed, null, 2), "utf-8");
  console.log(`  → ${OUT}`);
}

console.log("Building feed.json…");
main().catch((err) => {
  console.error("Feed build failed:", err);
  process.exit(1);
});
