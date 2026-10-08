import io

p = r"D:\My\Medical\src\data\doctors.ts"
s = io.open(p, encoding="utf-8").read()

s = s.replace(
    'const LOC = "Aurelia Multispeciality Hospital — Central Campus (demo)";',
    'const LOC_CENTRAL = "Aurelia Multispeciality Hospital — Central Campus (demo)";\n'
    'const LOC_NORTH = "Aurelia Multispeciality Hospital — North Annex (demo)";\n'
    'const LOC_RIVERSIDE = "Aurelia Multispeciality Hospital — Riverside Clinic (demo)";',
)
s = s.replace("location: OPSClinic(),", "location: LOC_CENTRAL,")

swaps = {
    "dr-kavya-reddy": "LOC_NORTH",
    "dr-meera-nair": "LOC_RIVERSIDE",
    "dr-vikram-desai": "LOC_NORTH",
    "dr-nandini-rao": "LOC_RIVERSIDE",
    "dr-tanvi-malhotra": "LOC_NORTH",
    "dr-sana-qureshi": "LOC_RIVERSIDE",
    "dr-dev-patel": "LOC_NORTH",
    "dr-arjun-kulkarni": "LOC_RIVERSIDE",
}
for slug, loc in swaps.items():
    idx = s.index('slug: "%s"' % slug)
    end = s.index("\n  },", idx)
    block = s[idx:end].replace("location: LOC_CENTRAL,", "location: %s," % loc)
    s = s[:idx] + block + s[end:]

s = s.replace("\nfunction OPSClinic() {\n  return LOC;\n}\n", "")
io.open(p, "w", encoding="utf-8", newline="\n").write(s)
print(s.count("LOC_CENTRAL"), s.count("LOC_NORTH"), s.count("LOC_RIVERSIDE"), "OPSClinic" in s)
