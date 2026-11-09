#!/bin/bash
# اختبار شامل لنظام المصادقة الجديد (هاتف + كلمة مرور + استعادة)
BASE=http://localhost:3000
PHONE="07701234001"
NEWPASS="Test@1234"

step(){ echo; echo "===== $1 ====="; }

step "1) تسجيل حساب جديد: إرسال رمز (REGISTER)"
SEND=$(curl -s -X POST $BASE/api/auth/otp/send -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"purpose\":\"REGISTER\"}")
echo "$SEND"
CODE=$(echo "$SEND" | python3 -c "import sys,json;print(json.load(sys.stdin)['devCode'])")

step "2) التحقق وإنشاء الحساب بكلمة مرور"
VERIFY=$(curl -s -X POST $BASE/api/auth/otp/verify -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"code\":\"$CODE\",\"name\":\"أحمد الاختبار\",\"password\":\"$NEWPASS\",\"role\":\"CUSTOMER\"}")
echo "$VERIFY" | python3 -c "import sys,json;d=json.load(sys.stdin);print('id:',d.get('id'),'| name:',d.get('name'),'| role:',d.get('role'),'| token:',bool(d.get('sessionToken')))"

step "3) دخول بكلمة مرور خاطئة → يجب 401 WRONG"
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"wrongpass\"}"; echo

step "4) دخول بكلمة المرور الصحيحة → يجب 200"
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"$NEWPASS\"}" | python3 -c "import sys,json;d=json.load(sys.stdin);print('name:',d.get('name'),'| role:',d.get('role'),'| token:',bool(d.get('sessionToken')))"

step "5) رقم غير مسجل → يجب 404 NO_USER"
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d '{"phone":"07701234999","password":"whatever"}'; echo

step "6) استعادة لرقم غير مسجل → يجب 404 NO_USER"
curl -s -X POST $BASE/api/auth/otp/send -H 'Content-Type: application/json' -d '{"phone":"07701234999","purpose":"RESET_PASSWORD"}'; echo

step "7) نسيت كلمة المرور: إرسال رمز ثم تعيين كلمة مرور جديدة"
RSEND=$(curl -s -X POST $BASE/api/auth/otp/send -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"purpose\":\"RESET_PASSWORD\"}")
RCODE=$(echo "$RSEND" | python3 -c "import sys,json;print(json.load(sys.stdin)['devCode'])")
curl -s -X POST $BASE/api/auth/password/reset -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"code\":\"$RCODE\",\"password\":\"NewPass@999\"}" | python3 -c "import sys,json;d=json.load(sys.stdin);print('passwordSet:',d.get('passwordSet'),'| name:',d.get('name'),'| token:',bool(d.get('sessionToken')))"

step "8) الدخول بكلمة المرور الجديدة → يجب 200"
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"NewPass@999\"}" | python3 -c "import sys,json;d=json.load(sys.stdin);print('name:',d.get('name'),'| token:',bool(d.get('sessionToken')))"

step "9) الدخول بالكلمة القديمة → يجب 401"
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"$NEWPASS\"}"; echo

step "10) قفل المحاولات: 5 أخطاء متتالية → يجب LOCKED"
for i in 1 2 3 4 5; do curl -s -o /dev/null -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"bad$i\"}"; done
curl -s -X POST $BASE/api/auth/login -H 'Content-Type: application/json' -d "{\"phone\":\"$PHONE\",\"password\":\"bad6\"}"; echo

step "11) حساب موجود بدون كلمة مرور يعبر مسار التسجيل → تُضبط كلمة مروره ويُدخل"
# نستخدم حساب موجودة قديمة (نشوف أول حساب بدون passwordHash من قاعدة البيانات)
OLDPHONE=$(cd /home/z/my-project && sqlite3 prisma/dev.db "SELECT phone FROM User WHERE passwordHash IS NULL AND role='CUSTOMER' AND phone NOT LIKE '0770%' LIMIT 1" 2>/dev/null)
echo "الرقم القديم المختار: $OLDPHONE"
