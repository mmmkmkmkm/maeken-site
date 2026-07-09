#!/usr/bin/env python3
"""Pixelate a photo for the maeken-site PHOTO ALBUM gallery.

Downscales the image to a small pixel grid, reduces the palette, then
upscales with nearest-neighbor so it reads as chunky retro pixel art that
matches the rest of the site (see public/assets/pixel/*.png for reference).

Usage:
    python3 pixelate.py <input> <output> [--pixels N] [--colors N]

    --pixels  length of the long edge in the downscaled grid (default 110).
              Smaller = chunkier/more retro. 80-100 reads as very blocky,
              140-160 keeps more facial/photo detail while still pixelated.
    --colors  palette size (default 48). Lower = more graphic/poster-like.
"""
import argparse
from PIL import Image


def pixelate(src: str, dst: str, pixels: int = 110, colors: int = 48) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if w >= h:
        new_w, new_h = pixels, max(1, round(h * pixels / w))
    else:
        new_w, new_h = max(1, round(w * pixels / h)), pixels

    small = im.resize((new_w, new_h), Image.LANCZOS)
    quant = small.quantize(colors=colors, method=Image.MEDIANCUT).convert("RGB")
    out = quant.resize((new_w * 6, new_h * 6), Image.NEAREST)
    out.save(dst)
    print(f"saved {dst} ({out.size[0]}x{out.size[1]}px, {colors} colors)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--pixels", type=int, default=110)
    parser.add_argument("--colors", type=int, default=48)
    args = parser.parse_args()
    pixelate(args.input, args.output, args.pixels, args.colors)
