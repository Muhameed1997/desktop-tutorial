#!/usr/bin/env python3
"""اختبار مسار الحساب القديم (بدون كلمة مرور) عبر مستخدم مؤقت — ثم حذفه"""
import json, sqlite3, time, urllib.request

BASE = "http://localhost:3000"
TMP_PHONE = "07701234002"

def post(path, payload):
    req = urllib.request.Request(
        BASE + path,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.load(r)
    except urllib.error.HTTPError as e:
        return e.code, json.load(e)

# 1) إدخال مستخدم مؤقت بدون كلمة مرور (يحاكي الحسابات القديمة)
now = int(time.time() * 1000)
con = sqlite3.connect("/home/z/my-project/db/custom.db")
con.execute(
    "INSERT INTO User (id, name, phone, role, accountStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
    ("tmp_legacy_test", "حساب قديم تجريبي", TMP_PHONE, "CUSTOMER", "NONE", now, now),
)
con.commit()
con.close()
print("✓ أُدخل مستخدم مؤقت بدون كلمة مرور:", TMP_PHONE)

# 2) مسار التسجيل بالرقم نفسه — يجب أن يضبط كلمة المرور ويسجل الدخول
s, d = post("/api/auth/otp/send", {"phone": TMP_PHONE, "purpose": "REGISTER"})
print("1) send:", s, "| isNewUser:", d.get("isNewUser"))
assert s == 200

s, d = post("/api/auth/otp/verify", {"phone": TMP_PHONE, "code": d["devCode"], "name": "تجريبي", "password": "Legacy@123"})
print("2) verify:", s, "| name:", d.get("name"), "| token:", bool(d.get("sessionToken")))
assert s == 200 and d.get("sessionToken")

# 3) الدخول بكلمة المرور المضبوطة
s, d = post("/api/auth/login", {"phone": TMP_PHONE, "password": "Legacy@123"})
print("3) login بالكلمة الجديدة:", s, "| code:", d.get("code", "-"))
assert s == 200

# 4) حساب موجود له كلمة مرور + رمز صحيح + كلمة مرور خاطئة عبر مسار التسجيل → EXISTS_WRONG_PASSWORD
s, d = post("/api/auth/otp/send", {"phone": "07701234001", "purpose": "REGISTER"})
s, d = post("/api/auth/otp/verify", {"phone": "07701234001", "code": d["devCode"], "password": "WrongPass"})
print("4) تسجيل برقم موجود وكلمة خاطئة:", s, "| code:", d.get("code"))
assert s == 401 and d.get("code") == "EXISTS_WRONG_PASSWORD"

# 5) التسجيل بالرقم الموجود وكلمة المرور الصحيحة → دخول
s, d = post("/api/auth/otp/send", {"phone": "07701234001", "purpose": "REGISTER"})
s, d = post("/api/auth/otp/verify", {"phone": "07701234001", "code": d["devCode"], "password": "NewPass@999"})
print("5) تسجيل برقم موجود وكلمة صحيحة:", s, "| name:", d.get("name"))
assert s == 200

# 6) كلمة مرور قصيرة عند إنشاء حساب جديد → 400
s, d = post("/api/auth/otp/send", {"phone": "07701234003", "purpose": "REGISTER"})
s, d = post("/api/auth/otp/verify", {"phone": "07701234003", "code": d["devCode"], "name": "قصير", "password": "123"})
print("6) كلمة مرور قصيرة:", s, "| error:", d.get("error"))
assert s == 400

# تنظيف: حذف المستخدم المؤقت وأرقام الاختبار المتبقية
con = sqlite3.connect("/home/z/my-project/db/custom.db")
con.execute("DELETE FROM User WHERE id='tmp_legacy_test'")
con.execute("DELETE FROM OtpCode WHERE phone IN ('07701234003')")
con.commit()
con.close()
print("✓ نُظفت بيانات الاختبار المؤقتة — كل اختبارات الحساب القديم نجحت")
