#!/bin/bash
# تحقق واحد-استدعاء: تشغيل الخادم + لقطات لترتيب «الأكثر رواجاً فوق الفئات»
cd /home/z/my-project
mkdir -p scripts/shots
rm -f scripts/shots/home-*.png
pkill -f "next dev" 2>/dev/null; sleep 1

echo "== [1] بدء الخادم =="
setsid nohup npm run dev > /tmp/dev-home.log 2>&1 &
DEV_PID=$!

CODE=000
for i in $(seq 1 60); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
  [ "$CODE" = "200" ] && break
  sleep 2
done
echo "HTTP:$CODE"
if [ "$CODE" != "200" ]; then echo "SERVER FAILED"; tail -30 /tmp/dev-home.log; kill $DEV_PID 2>/dev/null; exit 1; fi

echo "== [2] فتح الصفحة كزائر =="
agent-browser set viewport 420 900
agent-browser open http://localhost:3000
agent-browser wait 7000
agent-browser screenshot scripts/shots/home-01-gate.png || true

# الضغط على «متابعة كزائر»
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.textContent.includes('متابعة كزائر'))?.click(); 'clicked'"
agent-browser wait 3500
agent-browser screenshot scripts/shots/home-02-top.png || true

echo "== [3] لقطة الاعلى (بنر + رواج فوق الفئات) =="
agent-browser eval "document.querySelector('main')?.scrollTo({top: 240, behavior: 'instant'}); 'scrolled'"
agent-browser wait 1200
agent-browser screenshot scripts/shots/home-03-popular-over-cats.png || true

echo "== [4] اختيار فئة «متاجر» والتحقق من بقاء الرواج فوق الفئات =="
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'فئة متاجر')?.click(); 'cat-clicked'"
agent-browser wait 1500
agent-browser screenshot scripts/shots/home-04-cat-stores.png || true

echo "== [5] فئة «مطاعم» =="
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'فئة مطاعم')?.click(); 'cat-clicked2'"
agent-browser wait 1500
agent-browser screenshot scripts/shots/home-05-cat-restaurants.png || true

echo "== [6] فتح صفحة متجر من الرواج (تحقق من عدم كسرها) =="
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label')?.startsWith('فئة الكل'))?.click(); 'back-all'"
agent-browser wait 800
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label')?.includes('مطعم '))?.click(); 'store-clicked'"
agent-browser wait 3500
agent-browser screenshot scripts/shots/home-06-store.png || true

agent-browser close
pkill -f "next dev" 2>/dev/null
echo "== DONE =="
ls -la scripts/shots/home-*.png
