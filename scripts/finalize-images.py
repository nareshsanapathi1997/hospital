import json, os, shutil
from PIL import Image

ROOT = r"D:\My\Medical\public\img"
CAND = os.path.join(ROOT, "cand")

swaps = {
    "hero-hospital.jpg": "hero21.jpg",
    "icu.jpg": "icu1.jpg",
    "pharmacy.jpg": "pharm4.jpg",
    "operating-theatre.jpg": "oper2.jpg",
    "cardiology.jpg": "card4.jpg",
}
drop = ["corridor.jpg", "ultrasound.jpg", "nurse.jpg"]

for dst, src in swaps.items():
    s = os.path.join(CAND, src)
    d = os.path.join(ROOT, dst)
    if os.path.exists(s):
        shutil.copyfile(s, d)
        print("swap", dst, "<-", src)

for f in drop:
    p = os.path.join(ROOT, f)
    if os.path.exists(p):
        os.remove(p)
        print("drop", f)

# keep an extra exterior for the about page
extra = os.path.join(CAND, "hero23.jpg")
if os.path.exists(extra):
    shutil.copyfile(extra, os.path.join(ROOT, "campus.jpg"))

credits = {}
cpath = os.path.join(CAND, "credits.txt")
if os.path.exists(cpath):
    for line in open(cpath, encoding="cp1252", errors="replace"):
        parts = line.rstrip("\n").split("\t")
        if len(parts) >= 5:
            credits[parts[0]] = {"title": parts[1], "creator": parts[2], "license": parts[3], "source": parts[4]}

final = json.load(open(r"D:\My\Medical\src\data\imageCredits.json", encoding="utf-8-sig"))
by_file = {c["file"]: c for c in final}
for dst, src in swaps.items():
    if src in credits:
        c = dict(credits[src])
        c["file"] = dst
        by_file[dst] = c
for f in drop:
    by_file.pop(f, None)

# campus.jpg credit
if "hero23.jpg" in credits:
    c = dict(credits["hero23.jpg"])
    c["file"] = "campus.jpg"
    by_file["campus.jpg"] = c

# convert to webp
def convert(path, maxw, quality):
    im = Image.open(path).convert("RGB")
    if im.width > maxw:
        h = int(im.height * maxw / im.width)
        im = im.resize((maxw, h), Image.LANCZOS)
    out = os.path.splitext(path)[0] + ".webp"
    im.save(out, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(out) // 1024
    os.remove(path)
    print(os.path.basename(out), im.size, f"{kb}KB")

used = []
for f in sorted(os.listdir(ROOT)):
    if f.lower().endswith((".jpg", ".jpeg", ".png")):
        convert(os.path.join(ROOT, f), 1600 if f.startswith("hero") else 1300, 76)
        used.append(f.rsplit(".", 1)[0] + ".webp")

docdir = os.path.join(ROOT, "doctors")
for f in sorted(os.listdir(docdir)):
    if f.lower().endswith(".jpg"):
        convert(os.path.join(docdir, f), 440, 80)

# prune candidates
shutil.rmtree(CAND, ignore_errors=True)

out_credits = []
for f in sorted(used):
    key = f.replace(".webp", ".jpg")
    c = by_file.get(key, {})
    out_credits.append({
        "file": "img/" + f,
        "title": c.get("title", ""),
        "creator": c.get("creator", ""),
        "license": c.get("license", ""),
        "source": c.get("source", ""),
    })
json.dump(out_credits, open(r"D:\My\Medical\src\data\imageCredits.json", "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print("images:", len(out_credits))
