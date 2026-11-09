#!/bin/bash
# اختبار الدخول بكلمة المرور — نقرة دقيقة على الزر بالـrole
cd /home/z/my-project
setsid nohup npx next dev -p 3000 > dev.log 2>&1 < /dev/null &
for i in $(seq 1 40); do
  sleep 2
  curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 3 2>/dev/null | rg -q 200 && echo "SERVER READY" && break
done

agent-browser open http://localhost:3000 >/dev/null 2>&1
agent-browser wait 4200 >/dev/null 2>&1

# شاشة الدخول
agent-browser find text "لديك حساب؟ سجّل الدخول" click >/dev/null 2>&1
agent-browser wait 1000 >/dev/null 2>&1

# اختبار 1: كلمة مرور خاطئة — يجب رسالة خطأ
agent-browser find label "رقم الهاتف العراقي" fill "07701234001" >/dev/null 2>&1
agent-browser find label "كلمة المرور" fill "WrongPass@1" >/dev/null 2>&1
agent-browser find role button click --name "تسجيل الدخول" >/dev/null 2>&1
agent-browser wait 2000 >/dev/null 2>&1
echo "--- [1] كلمة مرور خاطئة:"
agent-browser snapshot -c 2>&1 | rg "غير صحيحة|تعذر" | head -2

# اختبار 2: زر إظهار كلمة المرور
echo "--- [2] إظهار كلمة المرور:"
agent-browser find role button click --name "إظهار كلمة المرور" >/dev/null 2>&1
agent-browser wait 300 >/dev/null 2>&1
agent-browser snapshot -i -c 2>&1 | rg "textbox \"كلمة المرور\"" | head -1
agent-browser get value 'input[type="text"]#login-pass' 2>/dev/null | head -1 || true

# اختبار 3: الدخول الصحيح
agent-browser find label "كلمة المرور" fill "Sara@2026" >/dev/null 2>&1
agent-browser find role button click --name "تسجيل الدخول" >/dev/null 2>&1
agent-browser wait 2500 >/dev/null 2>&1
echo "--- [3] دخول صحيح:"
agent-browser snapshot -c 2>&1 | rg "أهلاً بعودتك|سارة محمد|خروج" | head -4
agent-browser screenshot /tmp/login-final.png >/dev/null 2>&1

echo "--- [4] طلبات الدخول في سجل الخادم:"
rg "POST /api/auth/login" dev.log | tail -3
