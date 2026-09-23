/* Nyx / Scramjet service worker — must be same-origin as the HTML
 * Place this file next to index.html (same folder / same origin).
 * Loads jet/jet.sw.js from TongSherbet/storage (same mirrors as index 36).
 */
const ASSETS_MIRRORS = [
  "https://cdn.jsdelivr.net/gh/TongSherbet/storage/",
  "https://fastly.jsdelivr.net/gh/TongSherbet/storage/",
  "https://gcore.jsdelivr.net/gh/TongSherbet/storage/",
  "https://testingcf.jsdelivr.net/gh/TongSherbet/storage/",
  "https://quantil.jsdelivr.net/gh/TongSherbet/storage/",
  "https://originfastly.jsdelivr.net/gh/TongSherbet/storage/",
  "https://jsdelivr.b-cdn.net/gh/TongSherbet/storage/",
  "https://cdn.statically.io/gh/TongSherbet/storage@main/",
  "https://rawcdn.githack.com/TongSherbet/storage/main/",
  "https://raw.githack.com/TongSherbet/storage/main/",
  "https://cdn.staticdelivr.com/gh/TongSherbet/storage/main/",
  "https://raw.githubusercontent.com/TongSherbet/storage/main/",
  "https://raw.esm.sh/gh/TongSherbet/storage/",
  "https://esm.sh/gh/TongSherbet/storage/"
];

function assetUrl(base, path) {
  const p = String(path || "").replace(/^\//, "");
  const hour = Math.floor(Date.now() / 3600000);
  return base + p + (p.includes("?") ? "&" : "?") + hour + "&raw";
}

let loaded = false;
for (let i = 0; i < ASSETS_MIRRORS.length; i++) {
  try {
    importScripts(assetUrl(ASSETS_MIRRORS[i], "jet/jet.sw.js"));
    loaded = true;
    console.log("[nyx-sw] loaded jet.sw.js from", ASSETS_MIRRORS[i]);
    break;
  } catch (err) {
    console.warn("[nyx-sw] mirror failed", ASSETS_MIRRORS[i], err && err.message);
  }
}

if (!loaded) {
  console.error("[nyx-sw] all asset mirrors failed to load jet/jet.sw.js");
  self.addEventListener("install", (e) => self.skipWaiting());
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", (e) => {
    /* pass-through so the page still loads while proxy is offline */
  });
}
