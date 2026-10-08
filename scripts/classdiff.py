import re, pathlib, collections

root = pathlib.Path(r"D:\My\Medical\src")
used = collections.Counter()

# plain string attributes
attr_re = re.compile(r'className=\{?["\']([^"\']+)["\']')
# template literal attributes
tpl_re = re.compile(r'className=\{`([^`]*)`')
# any other quoted string literal inside a className={ ... } expression (loose)
loose_re = re.compile(r'className=\{([^{}]*)\}')
str_re = re.compile(r'["\']([^"\']+)["\']')

for p in root.rglob("*.tsx"):
    txt = p.read_text(encoding="utf-8")
    for m in attr_re.finditer(txt):
        for tok in m.group(1).split():
            used[tok] += 1
    for m in tpl_re.finditer(txt):
        expr = m.group(1)
        expr_wo_cond = re.sub(r'\$\{[^{}]*\}', ' ', expr)
        for tok in expr_wo_cond.split():
            used[tok] += 1
        for s in re.findall(r'\$\{[^{}]*\}', expr):
            for lit in str_re.findall(s):
                used[lit] += 1
    for m in loose_re.finditer(txt):
        for lit in str_re.findall(m.group(1)):
            used[lit] += 1

defined = set()
style_re = re.compile(r'\.(-?[A-Za-z][\w-]*)')
for p in (root / "styles").glob("*.css"):
    txt = p.read_text(encoding="utf-8")
    txt = re.sub(r'/\*.*?\*/', '', txt, flags=re.S)
    for m in style_re.finditer(txt):
        defined.add(m.group(1))

missing = sorted(t for t in used if t not in defined)
print("USED BUT NOT DEFINED (%d):" % len(missing))
for t in missing:
    print("  ", t, used[t])
