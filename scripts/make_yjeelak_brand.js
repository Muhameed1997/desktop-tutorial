/**
 * توليد أصول هوية «يجيلك Yjeelak» — أيقونة + شفافة داكنة + علامة مائية + وردمارك
 * يشغَّل بـ playwright (مثبّت globally) — ينتج PNG شفافة من HTML/SVG
 * run: node /home/z/my-project/scripts/make_yjeelak_brand.js
 */
const { chromium } = require("/home/z/.npm-global/lib/node_modules/playwright");
const fs = require("fs");

const OUT = "/home/z/my-project/public/brand";

// شعار الحرف Y مع دبوس موقع داخل الشعب + خطوط سرعة — بثلاث صيغ لونية
function glyph(yColor, pinColor, _pinHole) {
  // الثقب حقيقي via fill-rule evenodd (donut) — يُظهر ما خلفه (تدرج البلاطة أو الشفافية)
  return `
  <svg viewBox="0 0 512 448" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- خطوط السرعة -->
    <g stroke="${yColor}" stroke-width="30" stroke-linecap="round" transform="rotate(-10 80 170)">
      <path d="M 26 116 H 116"/>
      <path d="M 42 172 H 100"/>
      <path d="M 58 228 H 84"/>
    </g>
    <!-- حرف Y -->
    <g fill="none" stroke="${yColor}" stroke-width="78" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 148 96 L 268 250 L 388 96"/>
      <path d="M 268 250 L 268 398"/>
    </g>
    <!-- دبوس الموقع داخل شعب الحرف (donut + ذيل) -->
    <path fill-rule="evenodd" fill="${pinColor}"
      d="M 268 122 a 46 46 0 1 0 0.02 0 Z M 268 148 a 20 20 0 1 1 -0.02 0 Z"/>
    <path d="M 244 200 L 268 246 L 292 200 Z" fill="${pinColor}"/>
  </svg>`;
}

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family:'CairoB'; src:url('file:///tmp/fonts/Cairo-900.ttf'); font-weight:900; }
  @font-face { font-family:'CairoB'; src:url('file:///tmp/fonts/Cairo-700.ttf'); font-weight:700; }
  html, body { margin:0; background:transparent; }
  body { width:1300px; }
  .wrap { display:flex; flex-wrap:wrap; gap:40px; padding:20px; align-items:flex-start; }

  /* 1) أيقونة التطبيق — بلاطة متدرجة */
  #icon { width:512px; height:512px; border-radius:118px;
    background:linear-gradient(135deg, #fb8423 0%, #f06f05 52%, #c35a04 100%);
    display:flex; align-items:center; justify-content:center; }
  #icon .glyph { width:400px; height:350px; margin-top:14px; }

  /* 2) نسخة شفافة داكنة للهيدر الأبيض */
  #icon-dark { width:440px; height:385px; }
  #icon-dark .glyph { width:440px; height:385px; }

  /* 3) علامة مائية كريمية للبانر البرتقالي */
  #mark { width:400px; height:350px; }
  #mark .glyph { width:400px; height:350px; }

  /* 4) الوردمارك: يجيلك + Yjeelak */
  #wordmark { display:inline-flex; align-items:center; gap:26px; padding:24px 34px 44px; }
  #wordmark .ar { font-family:'CairoB'; font-weight:900; font-size:170px; color:#3c1c01; line-height:normal; }
  #wordmark .sep { width:7px; height:128px; border-radius:4px; background:linear-gradient(180deg,#fb8423,#f06f05); }
  #wordmark .en { font-family:'CairoB'; font-weight:700; font-size:96px; color:#964503; line-height:normal; letter-spacing:1px; }
</style></head>
<body dir="rtl">
<div class="wrap">
  <div id="icon"><div class="glyph">${glyph("#ffffff", "#fee9d7", "#c35a04")}</div></div>
  <div id="icon-dark"><div class="glyph">${glyph("#3c1c01", "#3c1c01", "transparent")}</div></div>
  <div id="mark"><div class="glyph">${glyph("#fee9d7", "#fdcfaa", "transparent")}</div></div>
  <div id="wordmark">
    <span class="ar">يجيلك</span>
    <span class="sep"></span>
    <span class="en" dir="ltr">Yjeelak</span>
  </div>
</div>
</body></html>`;

(async () => {
  fs.mkdirSync("/tmp/brand", { recursive: true });
  fs.writeFileSync("/tmp/brand/brand.html", html);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1300, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto("file:///tmp/brand/brand.html");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const shots = [
    ["#icon", `${OUT}/yjeelak-icon.png`],
    ["#icon-dark", `${OUT}/yjeelak-icon-dark.png`],
    ["#mark", `${OUT}/yjeelak-mark.png`],
    ["#wordmark", `${OUT}/yjeelak-wordmark-dark.png`],
  ];
  for (const [sel, path] of shots) {
    const el = await page.$(sel);
    await el.screenshot({ path, omitBackground: true });
    console.log("saved", path);
  }
  await browser.close();
})();
