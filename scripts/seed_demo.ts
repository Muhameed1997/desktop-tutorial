/**
 * بذرة بيانات تجريبية لمدينة حديثة — متاجر مطاعم/متاجر/أسواق مع أصناف
 * تُستخدم لاختبار واجهة الرئيسية الجديدة والتتبع
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const count = await db.store.count();
  if (count > 0) {
    console.log("يوجد متاجر مسبقاً:", count, "— تخطي");
    return;
  }

  const haditha = { lat: 34.1329, lng: 42.3775 };

  const rest1 = await db.store.create({
    data: {
      name: "مطعم دجاج حديثة",
      description: "دجاج بروستد ومشاوي شهية — الأشهر في المدينة",
      type: "RESTAURANT",
      category: "بروستد ومشاوي",
      rating: 4.8,
      deliveryFee: 1000,
      deliveryTime: "25-35 دقيقة",
      isOpen: true,
      isFeatured: true,
      phone: "07701234567",
      address: "حديثة – الشارع العام قرب دوار المستشفى",
      lat: haditha.lat + 0.0021,
      lng: haditha.lng + 0.0018,
      items: {
        create: [
          { name: "وجبة دجاج بروستد (8 قطع)", description: "مع بطاطا ومشروب", price: 7000, isPopular: true },
          { name: "شاورما دجاج", description: "خبز طازج وثومية", price: 3000, isPopular: true },
          { name: "برجر دجاج كرسبي", price: 3500 },
        ],
      },
    },
  });

  const rest2 = await db.store.create({
    data: {
      name: "بيت البيتزا",
      description: "بيتزا طازجة من الفرن الحجري بأنواع متعددة",
      type: "RESTAURANT",
      category: "بيتزا وفطائر",
      rating: 4.6,
      deliveryFee: 1000,
      deliveryTime: "30-40 دقيقة",
      isOpen: true,
      isFeatured: true,
      phone: "07701234568",
      address: "حديثة – حي المعلمين",
      lat: haditha.lat - 0.0016,
      lng: haditha.lng + 0.0026,
      items: {
        create: [
          { name: "بيتزا مارجريتا وسط", description: "جبنة موزاريلا وصلصة طماطم", price: 5000, isPopular: true },
          { name: "بيتزا بيبروني وسط", price: 6000, isPopular: true },
        ],
      },
    },
  });

  await db.store.create({
    data: {
      name: "مطعم الخير",
      description: "وجبات بغدادية شعبية — دولمة وتبيث وقالية",
      type: "RESTAURANT",
      category: "مأكولات عراقية",
      rating: 4.4,
      deliveryFee: 750,
      deliveryTime: "35-45 دقيقة",
      isOpen: true,
      isFeatured: false,
      phone: "07701234569",
      address: "حديثة – السوق الرئيسي",
      lat: haditha.lat + 0.0008,
      lng: haditha.lng - 0.0022,
      items: {
        create: [
          { name: "قالي عراقي", description: "لحم وخضار بصلصة الطماطم", price: 6500, isPopular: true },
        ],
      },
    },
  });

  await db.store.create({
    data: {
      name: "سوق النور",
      description: "مواد غذائية وحاجيات منزلية",
      type: "MARKET",
      category: "بقالة",
      rating: 4.5,
      deliveryFee: 500,
      deliveryTime: "20-30 دقيقة",
      isOpen: true,
      isFeatured: false,
      phone: "07701234570",
      address: "حديثة – شارع السوق",
      lat: haditha.lat - 0.0009,
      lng: haditha.lng - 0.0012,
      items: {
        create: [
          { name: "كرتون ماء 12 قارورة", price: 2500, isPopular: true },
          { name: "كيس سكر 5 كغ", price: 5000 },
        ],
      },
    },
  });

  await db.store.create({
    data: {
      name: "متجر الأنبار للإلكترونيات",
      description: "سماعات وشواحن وإكسسوارات موبايل",
      type: "STORE",
      category: "إلكترونيات",
      rating: 4.3,
      deliveryFee: 1000,
      deliveryTime: "40-50 دقيقة",
      isOpen: false,
      isFeatured: false,
      phone: "07701234571",
      address: "حديثة – الشارع العام",
      lat: haditha.lat + 0.0028,
      lng: haditha.lng - 0.0015,
      items: { create: [{ name: "سماعة بلوتوث", price: 12000 }] },
    },
  });

  const n = await db.store.count();
  console.log("تمت إضافة المتاجر:", n);
  console.log("rest1:", rest1.id, "| rest2:", rest2.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
