from pathlib import Path
import re

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
SIZES = ((800, 76), (1600, 82))


def referenced_images() -> list[str]:
    source = (ROOT / "index.html").read_text() + (ROOT / "script.js").read_text()
    matches = re.findall(r"IMG_\d+\.(?:jpeg|webp)", source)
    return sorted(set(filename.replace(".webp", ".jpeg") for filename in matches))


for filename in referenced_images():
    source_path = ROOT / filename
    if not source_path.exists():
        source_path = ROOT.parent / filename
    if not source_path.exists():
        continue

    with Image.open(source_path) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        for width, quality in SIZES:
            output_dir = ROOT / "media" / str(width)
            output_dir.mkdir(parents=True, exist_ok=True)
            output_path = output_dir / source_path.with_suffix(".webp").name
            resized = image.copy()
            resized.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
            resized.save(output_path, "WEBP", quality=quality, method=6)

print(f"Optimized {len(referenced_images())} referenced images at 800px and 1600px.")
