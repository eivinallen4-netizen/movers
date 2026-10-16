/*
 * Checks where the site ranks (top 50, mobile) and who holds the local pack for our money keywords.
 * Uses DataForSEO (DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD in .env.local). ~$0.01 per keyword.
 *
 *   node --env-file=.env.local scripts/seo/rank-check.mjs
 *   node --env-file=.env.local scripts/seo/rank-check.mjs "movers summerlin" "hot tub removal las vegas"
 */

const DOMAIN = "moversandjunkremoval.net";
const LOCATIONS = { "las vegas": 1022639, henderson: 1022635 }; // Google location codes

const DEFAULT_KEYWORDS = [
  "movers las vegas",
  "moving company las vegas",
  "junk removal las vegas",
  "cheap movers las vegas",
  "local movers las vegas",
  "movers henderson",
  "junk removal henderson",
  "moving company north las vegas",
  "furniture removal las vegas",
  "mattress disposal las vegas",
];

const { DATAFORSEO_LOGIN: login, DATAFORSEO_PASSWORD: password } = process.env;
if (!login || !password) {
  console.error("Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD (run with --env-file=.env.local).");
  process.exit(1);
}

const keywords = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_KEYWORDS;
const locationFor = (kw) => (kw.includes("henderson") ? LOCATIONS.henderson : LOCATIONS["las vegas"]);

const res = await fetch("https://api.dataforseo.com/v3/serp/google/organic/live/advanced", {
  method: "POST",
  headers: {
    Authorization: "Basic " + Buffer.from(`${login}:${password}`).toString("base64"),
    "Content-Type": "application/json",
  },
  body: JSON.stringify(
    keywords.map((keyword) => ({
      keyword,
      location_code: locationFor(keyword),
      language_code: "en",
      device: "mobile",
      depth: 50,
    })),
  ),
});
const data = await res.json();
if (data.status_code !== 20000) throw new Error(data.status_message);

let cost = 0;
for (const task of data.tasks) {
  cost += task.cost ?? 0;
  const result = task.result?.[0];
  if (!result) {
    console.log(`\n${task.data.keyword}: ${task.status_message}`);
    continue;
  }
  const ours = result.items.find((i) => i.type === "organic" && i.domain?.endsWith(DOMAIN));
  const pack = result.items.filter((i) => i.type === "local_pack").map((i) => `${i.title} (${i.rating?.votes_count ?? 0})`);
  console.log(`\n${result.keyword}: ${ours ? `#${ours.rank_group} ${ours.url}` : "not in top 50"}`);
  if (pack.length) console.log(`  local pack: ${pack.join("; ")}`);
}
console.log(`\nCost: $${cost.toFixed(3)}`);
