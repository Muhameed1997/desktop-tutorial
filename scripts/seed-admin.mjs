// إنشاء/تحديث حساب المدير الخاص — يدخل برقمه وكلمة مروره مثل باقي المستخدمين وتُفتح له لوحة التحكم تلقائياً
// الرقم من متغير البيئة ADMIN_PHONE (الافتراضي 07700000000)
// كلمة المرور من متغير البيئة ADMIN_PASSWORD — تُشفَّر بنفس مخطط src/lib/auth.ts (scrypt salt:hash)
// مثال: ADMIN_PHONE=07819409010 ADMIN_PASSWORD=admin1997 node scripts/seed-admin.mjs
import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "crypto";

const db = new PrismaClient();

const phone = (process.env.ADMIN_PHONE || "07700000000").replace(/\D/g, "");
const password = process.env.ADMIN_PASSWORD || "";

// نفس خوارزمية hashPassword في src/lib/auth.ts
function hashPassword(pw) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const data = { role: "ADMIN", accountStatus: "NONE" };
  if (password) data.passwordHash = hashPassword(password);

  const admin = await db.user.upsert({
    where: { phone },
    update: data,
    create: {
      name: "مدير التطبيق",
      phone,
      role: "ADMIN",
      accountStatus: "NONE",
      ...(password ? { passwordHash: data.passwordHash } : {}),
    },
  });
  console.log(
    `✅ Admin account ready: ${admin.name} — ${admin.phone} (role=${admin.role}, password=${password ? "set" : "unchanged"})`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
