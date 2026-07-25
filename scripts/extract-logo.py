from pathlib import Path
from PIL import Image

source = Path(r"public/images/brand/wardro-logo-source.png")
target = Path(r"public/images/brand/wardro-logo-terracotta.png")

image = Image.open(source).convert("RGB")
pixels = image.load()
alpha = Image.new("L", image.size, 0)
alpha_pixels = alpha.load()

for y in range(image.height):
    for x in range(image.width):
        r, g, b = pixels[x, y]
        whiteness = min(r, g, b)
        value = max(0, min(255, round((whiteness - 145) * 2.55)))
        alpha_pixels[x, y] = value

bbox = alpha.getbbox()
if bbox is None:
    raise RuntimeError("No logo artwork detected")

left, top, right, bottom = bbox
padding = 8
left = max(0, left - padding)
top = max(0, top - padding)
right = min(image.width, right + padding)
bottom = min(image.height, bottom + padding)
alpha = alpha.crop((left, top, right, bottom))

output = Image.new("RGBA", alpha.size, (200, 61, 31, 0))
output.putalpha(alpha)
target.parent.mkdir(parents=True, exist_ok=True)
output.save(target, optimize=True)
print(f"Saved {target} ({output.width}x{output.height})")
