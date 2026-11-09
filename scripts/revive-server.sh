#!/bin/bash
# إعادة تشغيل خادم يجيلك والتحقق الكامل — يترك الخادم يعمل في النهاية (بدون pkill)
cd /home/z/my-project
pkill -f "next dev" 2>/dev/null; sleep 1

echo "== [1] بدء الخادم =="
setsid nohup npm run dev > /tmp/dev-serve.log 2>&1 &
echo "DEV_PID:$!"

CODE=000
for i in $(seq 1 75); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
  [ "$CODE" = "200" ] && break
  sleep 2
done
echo "HTTP:$CODE"
if [ "$CODE" != "200" ]; then echo "SERVER FAILED"; tail -40 /tmp/dev-serve.log; exit 1; fi

echo "== [2] فحص البيانات من قاعدة البيانات =="
curl -s http://localhost:3000/api/stores | head -c 300; echo

echo "== [3] لقطة سريعة للتأكد أن الواجهة تعمل =="
mkdir -p scripts/shots
agent-browser set viewport 420 900
agent-browser open http://localhost:3000
agent-browser wait 7000
agent-browser eval "[...document.querySelectorAll('button')].find(b => b.textContent.includes('متابعة كزائر'))?.click(); 'guest'"
agent-browser wait 3500
agent-browser screenshot scripts/shots/revive-01-home.png || true
agent-browser eval "const t=document.body.innerText.slice(0,200); t"
agent-browser close

echo "== الخادم يعمل الآن ويُترك شغالاً =="
