#!/usr/bin/env python3
"""
Builds raster brand assets with Pillow:
  public/apple-touch-icon.png  (180×180 emblem tile, mirrors favicon.svg)
  public/og-image.jpg          (1200×630 social share image from the hero photo)

Usage: python3 scripts/build-icons.py   (run after scripts/fetch-images.py)
"""
import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FOREST, SAND, ACCENT = (23, 59, 50), (232, 216, 190), (198, 146, 82)


def cubic(p0, p1, p2, p3, n=40):
    return [
        tuple((1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t**2 * c + t**3 * d for a, b, c, d in zip(p0, p1, p2, p3))
        for t in (i / n for i in range(n + 1))
    ]


def emblem(draw, ox, oy, s, width):
    """Draws the 64×80 emblem geometry (see scripts/build-logo.mjs) at offset/scale."""
    P = lambda pts: [(ox + x * s, oy + y * s) for x, y in pts]
    arch = [(9, 76), (9, 37)] + cubic((9, 37), (9, 24.5), (19, 14.5), (32, 4)) + cubic((32, 4), (45, 14.5), (55, 24.5), (55, 37)) + [(55, 76), (9, 76)]
    draw.line(P(arch), fill=SAND, width=width, joint="curve")
    draw.line(P([(15.5, 52), (25, 38.5), (29.5, 44), (37, 32.5), (48.5, 52)]), fill=SAND, width=width, joint="curve")
    wave = [(15.5 + i * 33 / 80, 60 - 1.5 * math.sin(i / 80 * 4 * math.pi)) for i in range(81)]
    draw.line(P(wave), fill=SAND, width=int(width * 0.9), joint="curve")
    r = 3.4 * s
    cx, cy = ox + 32 * s, oy + 21 * s
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ACCENT)


def apple_icon():
    S = 180 * 4
    img = Image.new("RGB", (S, S), FOREST)
    d = ImageDraw.Draw(img)
    scale = S * 0.6 / 64 * 0.95
    emblem(d, (S - 64 * scale) / 2, (S - 80 * scale) / 2, scale, width=int(4 * scale * 0.95))
    img.resize((180, 180), Image.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)


def og_image():
    src = Image.open(PUBLIC / "images" / "hero-bamnoli-dusk-1920.webp").convert("RGB")
    w, h = src.size
    target = 1200 / 630
    ch = round(w / target)
    top = max(0, round((h - ch) * 0.55))
    src.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS).save(PUBLIC / "og-image.jpg", quality=84, optimize=True, progressive=True)


if __name__ == "__main__":
    apple_icon()
    og_image()
    print("Wrote public/apple-touch-icon.png and public/og-image.jpg")
