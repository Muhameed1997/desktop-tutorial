#!/usr/bin/env python3
"""تحويل لوحة الألوان: برتقالي → أزرق #0000CE + أخضر #3CFF89 (هوية يجيلك الجديدة)"""
import os, re, sys

ROOT = "/home/z/my-project/src"
EXTS = (".tsx", ".ts", ".css")

# (old, new) — تُطبق case-insensitive
MAP = [
    # الأساسي البرتقالي → أزرق الهوية
    ("f06f05", "0000CE"),
    ("c35a04", "0000A3"),
    ("fb8423", "3530E0"),
    ("ff6b00", "0000CE"),
    ("ffaa00", "00C46A"),
    # العنبري/الدفء → أخضر التوصيل
    ("fb9d50", "00C46A"),
    ("fdcfaa", "CFFFE2"),
    ("ffd9b3", "CFFFE2"),
    ("fff3e6", "EAEDFF"),
    ("fee9d7", "EAEDFF"),
    # الأخضر القديم → الأخضر الجديد
    ("2e7d32", "00875A"),
    ("e6f4ea", "DFFFEF"),
    # الحياد الدافئ → حياد بارد نظيف
    ("3c1c01", "0B1220"),
    ("693002", "3A4356"),
    ("111827", "0B1220"),
    ("b45309", "3A4356"),
    ("96683f", "667085"),
    ("f3ddc2", "E5E8EF"),
    ("efd0ae", "D8DDE8"),
    ("f6e7d6", "F4F6FA"),
    ("ebd0b2", "D8DDE8"),
    ("ddb287", "B9C1D0"),
    ("fdecd9", "EDF0F5"),
    ("f8f9fa", "F6F8FB"),
    # ظلال rgba
    ("rgba(60, 28, 1", "rgba(11, 18, 32"),
    ("rgba(60,28,1", "rgba(11,18,32"),
    ("rgba(240, 111, 5", "rgba(0, 0, 206"),
    ("rgba(240,111,5", "rgba(0,0,206"),
]

count_total = 0
for dirpath, _, files in os.walk(ROOT):
    for fn in files:
        if not fn.endswith(EXTS):
            continue
        p = os.path.join(dirpath, fn)
        with open(p, encoding="utf-8") as f:
            src = f.read()
        orig = src
        for old, new in MAP:
            src = re.sub(re.escape(old), new, src, flags=re.IGNORECASE)
        if src != orig:
            n = sum(len(re.findall(re.escape(o), orig, re.IGNORECASE)) for o, _ in MAP)
            count_total += n
            with open(p, "w", encoding="utf-8") as f:
                f.write(src)
            print(f"{p}: ~{n} استبدال")
print(f"المجموع: {count_total}")
