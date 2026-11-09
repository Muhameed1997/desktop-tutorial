// حارس قاعدة البيانات — يُشغَّل قبل `next dev` عند إقلاع البيئة
// المشكلة: إعادة تشغيل البيئة قد تفرّغ db/custom.db (لأن /db/*.db مستثنى من الحفظ)
// الحل: نسخة احتياطية في backups/ (محفوظة) — إذا كانت القاعدة فارغة والنسخة موجودة → استعادة تلقائية
import { existsSync, mkdirSync, copyFileSync, statSync, readdirSync } from "fs";
import { PrismaClient } from "@prisma/client";

const DB_PATH = "db/custom.db";
const BACKUP_DIR = "backups";

async function main() {
  if (!existsSync(DB_PATH) || statSync(DB_PATH).size < 4096) {
    console.log("🛡️ db-guard: قاعدة البيانات مفقودة أو فارغة");
  }

  let empty = false;
  try {
    const db = new PrismaClient();
    const [users, stores] = await Promise.all([db.user.count(), db.store.count()]);
    await db.$disconnect();
    empty = users === 0 && stores === 0;
  } catch (e) {
    // الجداول غير موجودة أصلاً — القاعدة فعلاً فارغة
    empty = true;
  }

  if (!empty) {
    console.log("🛡️ db-guard: قاعدة البيانات سليمة — لا حاجة للاستعادة");
    return;
  }

  if (!existsSync(BACKUP_DIR)) {
    console.log("🛡️ db-guard: لا توجد نسخة احتياطية — ستبدأ القاعدة فارغة");
    return;
  }

  const backups = readdirSync(BACKUP_DIR)
    .filter((f) => f.endsWith(".db"))
    .sort(); // الأسماء بتاريخ تصاعدي — نأخذ الأحدث
  if (backups.length === 0) {
    console.log("🛡️ db-guard: لا توجد نسخة احتياطية — ستبدأ القاعدة فارغة");
    return;
  }

  const latest = backups[backups.length - 1];
  copyFileSync(`${BACKUP_DIR}/${latest}`, DB_PATH);
  console.log(`🛡️ db-guard: استُعيدت قاعدة البيانات من النسخة الاحتياطية ${latest}`);
}

main().catch((e) => {
  console.error("db-guard error:", e.message);
  // لا نمنع إقلاع الخادم أبداً
});
