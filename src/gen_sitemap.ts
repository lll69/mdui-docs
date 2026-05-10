import { readdirSync } from "fs";
import { JSDOM } from "jsdom";

const times = {
    "0.1.1": 1494842877,
    "0.1.2": 1494845385,
    "0.2.0": 1494847566,
    "0.2.1": 1497008625,
    "0.3.0": 1509962852,
    "0.4.0": 1523503507,
    "0.4.1": 1541306198,
    "0.4.2": 1563351748,
    "0.4.3": 1594206970,
    "": 1594206970,
}

const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const sitePath = "https://lll69.github.io/mdui-docs/";
const window = new JSDOM('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>', { contentType: "application/xml" }).window;
const document = window.document;
document.insertBefore(document.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"'), document.firstChild);
const sitemap = document.documentElement;

for (const version of Object.keys(times)) {
    const lastMod = new Date(times[version] * 1000).toISOString();
    const baseStaticPath = "static/" + version + (version && "/");
    const basePath = version + (version && "/");
    for (const subPath of (readdirSync(baseStaticPath, { recursive: true }) as string[])) {
        if (subPath.endsWith(".html") && !subPath.startsWith("0.")) {
            const fullPath = sitePath + basePath + (subPath === "index.html" ? "" : subPath);
            const urlElem = document.createElementNS(NS, "url");
            const locElem = document.createElementNS(NS, "loc");
            locElem.textContent = fullPath;
            urlElem.appendChild(locElem);
            const lastModElem = document.createElementNS(NS, "lastmod");
            lastModElem.textContent = lastMod;
            urlElem.appendChild(lastModElem);
            sitemap.appendChild(urlElem);
        }
    }
}

console.log(new window.XMLSerializer().serializeToString(document));
