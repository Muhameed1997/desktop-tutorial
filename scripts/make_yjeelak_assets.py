#!/usr/bin/env python3
"""توليد أصول هوية يجيلك من اللوغوهات الرسمية المرفقة:
- Frame 20: يجيلك أخضر على أزرق #0000CE  → yjeelak-icon.png (أيقونة التطبيق/favicon)
- Frame 22: يجيلك أسود شفاف             → yjeelak-wordmark-dark.png (الهيدر على الخلفيات الفاتحة)
- Frame 21: يجيلك أبيض شفاف             → yjeelak-mark.png معاد تلوينه بالأخضر #3CFF89 (علامة مائية على البنر الأزرق)
"""
from PIL import Image
import os

UP = "/home/z/my-project/upload"
OUT = "/home/z/my-project/public/brand"
BLUE = (0, 0, 206)
GREEN = (60, 255, 137)


def trim(im: Image.Image, pad_ratio: float = 0.06) -> Image.Image:
    """قصّ الحواف الشفافة مع هامش نسبي"""
    bbox = im.getbbox()
    if not bbox:
        return im
    im = im.crop(bbox)
    w, h = im.size
    pad = int(max(w, h) * pad_ratio)
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad), im)
    return canvas


def pad_square(im: Image.Image, color, margin_ratio: float = 0.14) -> Image.Image:
    """توسيط على خلفية مربعة بلون موحد"""
    side = int(max(im.size) * (1 + margin_ratio * 2))
    canvas = Image.new("RGBA", (side, side), color + (255,))
    canvas.paste(im, ((side - im.width) // 2, (side - im.height) // 2), im)
    return canvas


def recolor(im: Image.Image, rgb) -> Image.Image:
    """إعادة تلوين كل البكسلات المعتمة (يحافظ على الشفافية والعتامة)"""
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    px = im.load()
    po = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a > 0:
                po[x, y] = (*rgb, a)
    return out


# 1) أيقونة التطبيق: Frame 20 (أخضر على أزرق) مربع 512
f20 = Image.open(os.path.join(UP, "Frame 20.png")).convert("RGBA")
icon = pad_square(trim(f20, 0.02), BLUE, 0.16).resize((512, 512), Image.LANCZOS)
icon.save(os.path.join(OUT, "yjeelak-icon.png"))
print("yjeelak-icon.png", icon.size)

# 2) الاسم الأسود الشفاف للهيدر: Frame 22
f22 = trim(Image.open(os.path.join(UP, "Frame 22.png")).convert("RGBA"), 0.04)
f22.thumbnail((1600, 1600), Image.LANCZOS)
f22.save(os.path.join(OUT, "yjeelak-wordmark-dark.png"))
print("yjeelak-wordmark-dark.png", f22.size)

# 3) العلامة المائية الخضراء للبنر الأزرق: Frame 21 (أبيض) → أخضر
f21 = trim(Image.open(os.path.join(UP, "Frame 21.png")).convert("RGBA"), 0.04)
mark = recolor(f21, GREEN)
mark.thumbnail((900, 900), Image.LANCZOS)
mark.save(os.path.join(OUT, "yjeelak-mark.png"))
print("yjeelak-mark.png", mark.size)

# 4) نسخة بيضاء للأسطح الداكنة (احتياط)
white = trim(Image.open(os.path.join(UP, "Frame 21.png")).convert("RGBA"), 0.04)
white.thumbnail((1200, 1200), Image.LANCZOS)
white.save(os.path.join(OUT, "yjeelak-wordmark-white.png"))
print("yjeelak-wordmark-white.png", white.size)

# إزالة الأيقونة القديمة غير المستخدمة بعد تحديث الهيدر
old = os.path.join(OUT, "yjeelak-icon-dark.png")
if os.path.exists(old):
    os.remove(old)
    print("removed yjeelak-icon-dark.png")
