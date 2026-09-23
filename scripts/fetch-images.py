#!/usr/bin/env python3
"""
Downloads the licensed Wikimedia Commons photos used on the site, generates
responsive WebP renditions in public/images/ and writes src/data/images.json
(dimensions, dominant colour, author, licence, source page).

Usage:  python3 scripts/fetch-images.py
Needs:  Pillow (pip install pillow)

To add or replace a photo, edit IMAGES below and re-run the script.
Only use images whose licence permits reuse, and keep attribution intact.
"""
import json
import re
import time
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "data" / "images.json"
UA = "HotelJaiBhairavnathSite/1.0 (image pipeline; python urllib)"

HERO_WIDTHS = [640, 960, 1440, 1920, 2560]
DEFAULT_WIDTHS = [480, 800, 1200, 1600]

# id -> (Commons file title, widths)
IMAGES = {
    "hero-bamnoli-dusk": ("File:Bamnoli,Maharashtra, India.jpg", HERO_WIDTHS),
    "bamnoli-sunset": ("File:Bamnoli Village Sunset on its Lake, Satara ,Pune 2.jpg", DEFAULT_WIDTHS),
    "boats-jetty": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (349).jpg", HERO_WIDTHS),
    "boats-moored": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (352).jpg", DEFAULT_WIDTHS),
    "boats-row": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (353).jpg", DEFAULT_WIDTHS),
    "boats-shore": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (357).jpg", DEFAULT_WIDTHS),
    "lake-island": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (29).jpg", DEFAULT_WIDTHS),
    "lake-shore": ("File:Bamnoli lake, Satara - vrvbsatara102k23iph (21).jpg", DEFAULT_WIDTHS),
    "lake-mesa": ("File:Shivasagar.jpg", DEFAULT_WIDTHS),
    "lake-flooded-trees": ("File:Bamnoli view at Shivsagar lake.jpg", DEFAULT_WIDTHS),
    "backwater-sunset": ("File:Sunset at Water Reservoir.jpg", HERO_WIDTHS),
    "natural-mirror": ("File:Natural Mirror.jpg", DEFAULT_WIDTHS),
    "backwater-clouds": ("File:Wait for Monsoon.jpg", DEFAULT_WIDTHS),
    "lake-january": ("File:Shivsagar Lake in January.jpg", DEFAULT_WIDTHS),
    "vasota-ridge": ("File:Vasota fort Maharashtra.jpg", HERO_WIDTHS),
    "vasota-view": ("File:View from vasota fort.jpg", DEFAULT_WIDTHS),
    "vasota-koyna-view": ("File:View of koyna river.jpg", DEFAULT_WIDTHS),
    "vasota-backwater": ("File:Vasota.jpg", DEFAULT_WIDTHS),
    "koyna-sanctuary": ("File:Koyna Maharashtra.jpg", DEFAULT_WIDTHS),
    "kaas-flowers": ("File:Kaas plateau flowers 1.jpg", DEFAULT_WIDTHS),
    "kaas-yellow": ("File:Kaas plateau of flowers, Maharashtra.jpg", DEFAULT_WIDTHS),
    "kaas-sahyadri": ("File:Kaas plateau flowers sahyadri mountains.jpg", DEFAULT_WIDTHS),
    "kas-lake": ("File:Kas lake viewed from plateau (1652102543).jpg", DEFAULT_WIDTHS),
    "ghats-viewpoint": ("File:A Spectacular Viewpoint on Western Ghats, India (Near Kas Patthar) (48847455401).jpg", HERO_WIDTHS),
    "vajrai": ("File:Vajrai Waterfall.jpg", DEFAULT_WIDTHS),
    "thoseghar": ("File:Thoseghar Waterfalls - Satara, Pune.jpg", DEFAULT_WIDTHS),
    "sajjangad": ("File:Sajjangad entrance.jpg", DEFAULT_WIDTHS),
    "mahabaleshwar": ("File:View from Mahabaleshwar Krishna Temple 1.jpg", DEFAULT_WIDTHS),
    "panchgani": ("File:View from Panchgani, Maharashtra.jpg", DEFAULT_WIDTHS),
    "tapola-forest": ("File:Forest in Tapola, Satara.jpg", DEFAULT_WIDTHS),
    "food-thali": ("File:Maharashtrian Mejwani.jpg", DEFAULT_WIDTHS),
    "food-pithla-bhakri": ("File:Pithla Bhakri NMM Soc Thane Maharashtra 01.jpg", DEFAULT_WIDTHS),
    "food-jhunka-bhakri": ("File:Jhunka Bhakar.JPG", DEFAULT_WIDTHS),
    "food-misal": ("File:Kolhapuri Misal Pav.jpg", DEFAULT_WIDTHS),
    "food-thali-2": ("File:Maharashtrian Thali 2.JPG", DEFAULT_WIDTHS),
}


def fetch(url):
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            return urllib.request.urlopen(req, timeout=60).read()
        except Exception:
            time.sleep(20 * (attempt + 1))
    raise RuntimeError(f"Failed to fetch {url}")


def clean(html):
    text = re.sub(r"<[^>]+>", "", html or "")
    return re.sub(r"\s+", " ", text).strip()


def metadata(titles, width):
    params = {
        "action": "query",
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": width,
        "titles": "|".join(titles),
        "format": "json",
    }
    data = json.loads(fetch("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)))
    out = {}
    for page in data["query"]["pages"].values():
        info = page["imageinfo"][0]
        meta = info["extmetadata"]
        out[page["title"]] = {
            # Cached thumbnails are far less rate-limited than original files.
            "download": info["thumburl"].split("?")[0],
            "page": info["descriptionurl"],
            "author": clean(meta.get("Artist", {}).get("value")),
            "license": clean(meta.get("LicenseShortName", {}).get("value")),
            "licenseUrl": clean(meta.get("LicenseUrl", {}).get("value")),
        }
    return out


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    meta = {}
    for widths in (HERO_WIDTHS, DEFAULT_WIDTHS):
        titles = [t for t, w in IMAGES.values() if w is widths]
        for i in range(0, len(titles), 40):
            meta.update(metadata(titles[i : i + 40], widths[-1]))
            time.sleep(1)

    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    manifest = {k: v for k, v in manifest.items() if k in IMAGES}
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    for image_id, (title, widths) in IMAGES.items():
        if image_id in manifest and all(
            (OUT_DIR / f"{image_id}-{x}.webp").exists() for x in manifest[image_id]["widths"]
        ):
            continue
        m = meta[title]
        img = ImageOps.exif_transpose(Image.open(BytesIO(fetch(m["download"])))).convert("RGB")
        w, h = img.size
        usable = [x for x in widths if x < w] + [min(w, widths[-1])]
        usable = sorted(set(usable))
        for target in usable:
            out = img if target == w else img.resize((target, round(h * target / w)), Image.LANCZOS)
            out.save(OUT_DIR / f"{image_id}-{target}.webp", "WEBP", quality=72, method=6)
        r, g, b = img.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        author = m["author"]
        if author.startswith("http"):
            author = "Flickr user (see source page)"
        manifest[image_id] = {
            "width": w,
            "height": h,
            "widths": usable,
            "color": f"#{r:02x}{g:02x}{b:02x}",
            "source": "Wikimedia Commons",
            "sourceUrl": m["page"],
            "author": author,
            "license": m["license"],
            "licenseUrl": m["licenseUrl"],
        }
        MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
        print(f"{image_id}: {w}x{h} {usable} {m['license']} — {author}", flush=True)
        time.sleep(6)

    ordered = {k: manifest[k] for k in IMAGES if k in manifest}
    MANIFEST.write_text(json.dumps(ordered, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {MANIFEST}")


if __name__ == "__main__":
    main()
