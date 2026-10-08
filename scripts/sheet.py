import sys, os, glob
from PIL import Image, ImageDraw, ImageFont

pattern = sys.argv[1]
out = sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
cell_w = int(sys.argv[4]) if len(sys.argv) > 4 else 380
cell_h = int(sys.argv[5]) if len(sys.argv) > 5 else 280
label_h = 26

files = sorted(glob.glob(pattern))
if not files:
    raise SystemExit("no files")

rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell_w, rows * (cell_h + label_h)), (15, 23, 42))
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("arial.ttf", 15)
except Exception:
    font = ImageFont.load_default()

for i, f in enumerate(files):
    try:
        im = Image.open(f).convert("RGB")
    except Exception:
        continue
    im.thumbnail((cell_w - 8, cell_h - 8))
    x = (i % cols) * cell_w
    y = (i // cols) * (cell_h + label_h)
    sheet.paste(im, (x + (cell_w - im.width) // 2, y + (cell_h - im.height) // 2))
    d.text((x + 6, y + cell_h + 4), os.path.basename(f)[:44], fill=(226, 232, 240), font=font)

sheet.save(out, quality=82)
print(out, sheet.size, len(files))
