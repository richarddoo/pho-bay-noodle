#!/usr/bin/env python3
"""Generate optimised WebP variants used by the site from the original photos."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

# (source, stem, widths)
TARGETS = [
    ("menu/pho-serve.jpg", "menu/pho-serve", [1400, 800]),
    ("menu/pho.jpg", "menu/pho", [1200, 700]),
    ("menu/noodle-salad.jpg", "menu/noodle-salad", [1200, 700]),
    ("menu/spring-rolls.jpg", "menu/spring-rolls", [1200, 700]),
    ("menu/rice-paper.jpg", "menu/rice-paper", [1200, 700]),
    ("catering.png", "catering", [1400]),
] + [
    (f"catering_menu/image{i}.png", f"catering_menu/image{i}", [1100, 600])
    for i in range(1, 13)
]


def save_webp(img: Image.Image, dest: Path, quality: int = 82) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=quality, method=6)
    print(f"{dest.relative_to(ROOT)}  {dest.stat().st_size // 1024} KB")


def main() -> None:
    for rel, stem, widths in TARGETS:
        src = PUBLIC / rel
        with Image.open(src) as raw:
            img = ImageOps.exif_transpose(raw).convert("RGB")
            for width in widths:
                resized = img.copy()
                resized.thumbnail((width, width * 4), Image.LANCZOS)
                save_webp(resized, PUBLIC / f"{stem}-{width}.webp")

    # Logo: keep transparency, shrink for the header, story stamp and favicons.
    with Image.open(PUBLIC / "logo-v6.png") as raw:
        source = raw.convert("RGBA")

        for width, name in ((160, "logo-160.png"),):
            logo = source.copy()
            logo.thumbnail((width, width), Image.LANCZOS)
            logo.save(PUBLIC / name, optimize=True)
            print(f"public/{name}  {(PUBLIC / name).stat().st_size // 1024} KB")

        favicon = source.copy()
        favicon.thumbnail((64, 64), Image.LANCZOS)
        favicon.save(PUBLIC / "favicon-64.png", optimize=True)

        touch = source.copy()
        touch.thumbnail((180, 180), Image.LANCZOS)
        touch.save(PUBLIC / "apple-touch-icon.png", optimize=True)

    # Social share image, cropped from the hero photograph.
    with Image.open(PUBLIC / "menu/pho-serve.jpg") as raw:
        img = ImageOps.exif_transpose(raw).convert("RGB")
        og = ImageOps.fit(img, (1200, 630), Image.LANCZOS, centering=(0.55, 0.45))
        og.save(PUBLIC / "og-image.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        print(f"public/og-image.jpg  {(PUBLIC / 'og-image.jpg').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
