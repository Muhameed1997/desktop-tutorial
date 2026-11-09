import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
import { HADITHA_CENTER, haversineKm, etaMinutesFor } from "../src/lib/geo";

const db = new PrismaClient();

const IMG = "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt";

interface SeedItem {
  name: string;
  description?: string;
  price: number;
  section: string;
  imageUrl?: string;
  isPopular?: boolean;
}

interface SeedStore {
  name: string;
  description: string;
  type: "RESTAURANT" | "STORE" | "MARKET";
  category: string;
  imageUrl: string;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  minOrder: number;
  isOpen: boolean;
  isFeatured: boolean;
  phone: string;
  address: string;
  lat: number;
  lng: number;
  items: SeedItem[];
}

// كل المتاجر داخل مدينة حديثة فقط — محافظة الأنبار
const DATA: SeedStore[] = [
  {
    name: "مطعم الفرات للأسماك",
    description: "مسقوف وشبوط طازج من نهر الفرات يُشوى على الحطب — تخصص حديثة الأصيل",
    type: "RESTAURANT",
    category: "أسماك",
    imageUrl: `${IMG}/270212071ef0.jpg`,
    rating: 4.9,
    deliveryFee: 1000,
    deliveryTime: "35-50 دقيقة",
    minOrder: 10000,
    isOpen: true,
    isFeatured: true,
    phone: "07701234567",
    address: "حديثة – كورنيش الفرات – قرب الجسر",
    lat: 34.1352,
    lng: 42.3751,
    items: [
      { name: "مسقوف صدر مشوي", description: "سمك مسقوف كامل مشوي على الحطب مع رز وطماطة", price: 30000, section: "أسماك", imageUrl: `${IMG}/9adfc1e05fba.jpg`, isPopular: true },
      { name: "تكة شبوط نهرية", description: "تكة سمك شبوط طازج من الفرات مع رز وسلطة", price: 15000, section: "أسماك", isPopular: true },
      { name: "صيادية سمك", description: "سمك مع رز الصيادية بالبصل المكرمل", price: 18000, section: "أسماك" },
      { name: "سمبصة سمك", description: "سمبصة سمك مقرمشة 5 قطع", price: 8000, section: "مقبلات", imageUrl: `${IMG}/c67d015d89e1.jpg` },
      { name: "دقة بغدادية", price: 2000, section: "مقبلات" },
      { name: "شاي عراقي", price: 1000, section: "المشروبات" },
    ],
  },
  {
    name: "بيت الكبابي العراقي – حديثة",
    description: "أشهى الكباب العراقي الأصيل على الطريقة البغدادية مع تشريب ودولمة",
    type: "RESTAURANT",
    category: "عراقي",
    imageUrl: `${IMG}/0663342f358f.jpg`,
    rating: 4.8,
    deliveryFee: 1000,
    deliveryTime: "35-50 دقيقة",
    minOrder: 5000,
    isOpen: true,
    isFeatured: true,
    phone: "07701234568",
    address: "حديثة – مركز المدينة – الشارع العام",
    lat: 34.1331,
    lng: 42.3789,
    items: [
      { name: "كباب مشكل", description: "كباب لحم ودجاج مع رز ودبس الرمان", price: 12000, section: "الأطباق الرئيسية", imageUrl: `${IMG}/77ebbdd3c2a2.jpg`, isPopular: true },
      { name: "تكة لحم", description: "قطع لحم غنم طازج مشوية على الفحم", price: 14000, section: "الأطباق الرئيسية", imageUrl: `${IMG}/8df3cb9aa144.jpeg` },
      { name: "تشريب كباب", description: "مرق بغدادي مع كباب ورز", price: 9000, section: "الأطباق الرئيسية", isPopular: true },
      { name: "دولمة عراقية", description: "ورق عنب وباذنجان ورضبي محشي بالرز واللحم", price: 11000, section: "الأطباق الرئيسية" },
      { name: "رز بخاري", description: "رز بخاري مع دجاج على الطريقة العراقية", price: 12500, section: "الأطباق الرئيسية" },
      { name: "سلطة عراقية", description: "خضار طازجة مع دبس الرمان", price: 2500, section: "المقبلات" },
      { name: "بيبسي", price: 1000, section: "المشروبات" },
    ],
  },
  {
    name: "دجاج حديثة بروست",
    description: "بروست مقرمش على الطريقة الخاصة مع صوصات متنوعة وبطاطا ساخنة",
    type: "RESTAURANT",
    category: "دجاج ومشويات",
    imageUrl: `${IMG}/db22cd3b5273.jpg`,
    rating: 4.6,
    deliveryFee: 500,
    deliveryTime: "25-40 دقيقة",
    minOrder: 3000,
    isOpen: true,
    isFeatured: true,
    phone: "07712345678",
    address: "حديثة – حي المعلمين – قرب مدرسة الفرات",
    lat: 34.1298,
    lng: 42.3822,
    items: [
      { name: "وجبة بروست ربع دجاجة", description: "ربع دجاجة بروست + بطاطا + خبز + مشروب", price: 7000, section: "وجبات", imageUrl: `${IMG}/1ef41697dbd5.jpg`, isPopular: true },
      { name: "وجبة بروست نصف دجاجة", description: "نصف دجاجة بروست + بطاطا كبيرة + خبز + مشروب", price: 12500, section: "وجبات", isPopular: true },
      { name: "أجنحة مقرمشة 8 قطع", description: "أجنحة دجاج بصوص الباربكيو الحار", price: 8500, section: "وجبات", imageUrl: `${IMG}/89c144d05798.jpg` },
      { name: "شاورما دجاج عربي", description: "شاورما دجاج بخبز عربي مع مخلل", price: 5000, section: "سندويشات" },
      { name: "بروست صاج", description: "صاج دجاج بروست مع صوص الثوم", price: 5500, section: "سندويشات" },
      { name: "بطاطا مقرمشة كبيرة", price: 3000, section: "إضافات" },
      { name: "بيبسي كبير", price: 1500, section: "المشروبات" },
    ],
  },
  {
    name: "شاورما الأنبار",
    description: "شاورما عراقية أصيلة — صاج وعربي بصوصات بيتية وأصناف طازجة يومياً",
    type: "RESTAURANT",
    category: "شاورما",
    imageUrl: `${IMG}/d2e5eabe81e9.jpg`,
    rating: 4.7,
    deliveryFee: 500,
    deliveryTime: "20-35 دقيقة",
    minOrder: 3000,
    isOpen: true,
    isFeatured: true,
    phone: "07723456789",
    address: "حديثة – شارع الستين (60)",
    lat: 34.1367,
    lng: 42.3804,
    items: [
      { name: "صاج شاورما دجاج", description: "شاورما دجاج بخبز صاج مع بطاطا ومخلل", price: 4500, section: "سندويشات", imageUrl: `${IMG}/e02e30f1c864.jpg`, isPopular: true },
      { name: "صاج شاورما لحم", description: "شاورما لحم بقري طازج بصوص الطحينة", price: 6000, section: "سندويشات" },
      { name: "عربي شاورما دجاج", description: "شاورما بخبز عربي محمص", price: 4000, section: "سندويشات", isPopular: true },
      { name: "صحية شاورما كبيرة", description: "صحية شاورما كبيرة تكفي شخصين", price: 11000, section: "صحيات", imageUrl: `${IMG}/9b6e538b217e.jpg` },
      { name: "بطاطا بالجبن", price: 3500, section: "إضافات" },
      { name: "عصير ليمون", price: 2000, section: "المشروبات" },
    ],
  },
  {
    name: "مشاوي الرافدين – حديثة",
    description: "مشاوي شرقية فاخرة — مشكل مشاوي وكباب وشيش طاووق",
    type: "RESTAURANT",
    category: "دجاج ومشويات",
    imageUrl: `${IMG}/8df3cb9aa144.jpeg`,
    rating: 4.7,
    deliveryFee: 1000,
    deliveryTime: "35-50 دقيقة",
    minOrder: 8000,
    isOpen: true,
    isFeatured: false,
    phone: "07767890123",
    address: "حديثة – حي الضباط",
    lat: 34.1307,
    lng: 42.3731,
    items: [
      { name: "مشكل مشاوي", description: "كباب + شيش طاووق + ريش لحم مع رز", price: 20000, section: "مشاوي", imageUrl: `${IMG}/77ebbdd3c2a2.jpg`, isPopular: true },
      { name: "شيش طاووق", description: "دجاج مشوي باللبن والليمون", price: 11000, section: "مشاوي" },
      { name: "ريش لحم غنم", price: 17000, section: "مشاوي" },
      { name: "حمص بالطحينة", price: 3000, section: "مقبلات" },
      { name: "متبل باذنجان", price: 3000, section: "مقبلات" },
    ],
  },
  {
    name: "بيتزا نابولي – حديثة",
    description: "بيتزا إيطالية بعجينة طازجة مخبوزة بالحجر — جبنة موزاريلا حقيقية",
    type: "RESTAURANT",
    category: "بيتزا",
    imageUrl: `${IMG}/07ef5552aeef.jpg`,
    rating: 4.5,
    deliveryFee: 1000,
    deliveryTime: "30-45 دقيقة",
    minOrder: 6000,
    isOpen: true,
    isFeatured: false,
    phone: "07734567890",
    address: "حديثة – حي الكرامة",
    lat: 34.1276,
    lng: 42.3766,
    items: [
      { name: "بيتزا مارغريتا وسط", description: "صوص طماطم وموزاريلا وريحان طازج", price: 9000, section: "بيتزا", imageUrl: `${IMG}/8e5f207627f1.jpg`, isPopular: true },
      { name: "بيتزا بيبروني وسط", description: "بيبروني حار مع موزاريلا", price: 12000, section: "بيتزا", isPopular: true },
      { name: "بيتزا خضار وسط", description: "فلفل، فطر، زيتون، بصل، طماطم", price: 8500, section: "بيتزا", imageUrl: `${IMG}/65b396bb0f24.jpg` },
      { name: "بيتزا دجاج باربكيو وسط", description: "دجاج مشوي بصوص الباربكيو والبصل المكرمل", price: 13000, section: "بيتزا" },
      { name: "كولا", price: 1000, section: "المشروبات" },
    ],
  },
  {
    name: "برجر الفرات",
    description: "برجر بقري طازج 100% يُشوى على الطلب — خبز بريوش محمص بالزبدة",
    type: "RESTAURANT",
    category: "برجر",
    imageUrl: `${IMG}/12929a513053.jpg`,
    rating: 4.6,
    deliveryFee: 500,
    deliveryTime: "25-40 دقيقة",
    minOrder: 4000,
    isOpen: true,
    isFeatured: false,
    phone: "07745678901",
    address: "حديثة – السوق القديم",
    lat: 34.1341,
    lng: 42.3742,
    items: [
      { name: "تشيز برجر كلاسيك", description: "قطعة لحم 150غم مع جبن شيدر وصوص خاص", price: 7000, section: "برجر", imageUrl: `${IMG}/c280d618343d.jpg`, isPopular: true },
      { name: "دبل سموكي برجر", description: "قطعتان لحم 300غم مع جبن مزدوج", price: 12000, section: "برجر" },
      { name: "كرسبي تشيكن برجر", description: "دجاج مقرمش مع خس وصوص مايونيز ثوم", price: 6500, section: "برجر", imageUrl: `${IMG}/ca78a7a71f13.jpg` },
      { name: "بطاطا ودجز", description: "بطاطا سميكة بالتوابل الخاصة", price: 3000, section: "إضافات", isPopular: true },
      { name: "حلقات بصل مقرمشة", price: 3500, section: "إضافات" },
      { name: "ميلك شيك فراولة", price: 4000, section: "المشروبات" },
    ],
  },
  {
    name: "سوق الحديثة المركزي للخضار والفواكه",
    description: "أطازج الخضار والفواكه يومياً من مزارع حوض الفرات — توفير للمنازل",
    type: "MARKET",
    category: "خضار وفواكه",
    imageUrl: `${IMG}/79a146f2ee73.jpg`,
    rating: 4.4,
    deliveryFee: 1000,
    deliveryTime: "40-60 دقيقة",
    minOrder: 5000,
    isOpen: true,
    isFeatured: false,
    phone: "07778901234",
    address: "حديثة – السوق المركزي",
    lat: 34.1337,
    lng: 42.3761,
    items: [
      { name: "طماطم 1 كغم", price: 1000, section: "خضار", imageUrl: `${IMG}/314186cff999.jpg` },
      { name: "خيار 1 كغم", price: 1000, section: "خضار" },
      { name: "بطاطا 1 كغم", price: 1500, section: "خضار" },
      { name: "بصل 1 كغم", price: 1000, section: "خضار" },
      { name: "تفاح أحمر 1 كغم", price: 4000, section: "فواكه", imageUrl: `${IMG}/dd3050bee357.jpg`, isPopular: true },
      { name: "موز 1 كغم", price: 3000, section: "فواكه" },
      { name: "برتقال 1 كغم", price: 2500, section: "فواكه" },
      { name: "عنب أسود 1 كغم", price: 5000, section: "فواكه" },
    ],
  },
  {
    name: "سوبرماركت الفرات للتوفير",
    description: "كل احتياجات المنزل من مواد غذائية ومنظفات — عروض يومية وتوصيل سريع داخل حديثة",
    type: "MARKET",
    category: "سوبرماركت",
    imageUrl: `${IMG}/3c36cd4e4dcd.jpg`,
    rating: 4.5,
    deliveryFee: 1000,
    deliveryTime: "30-50 دقيقة",
    minOrder: 10000,
    isOpen: true,
    isFeatured: true,
    phone: "07789012345",
    address: "حديثة – حي المعلمين – الشارع الرئيسي",
    lat: 34.1303,
    lng: 42.3799,
    items: [
      { name: "حليب نضارة 1 لتر", price: 2000, section: "ألبان", imageUrl: `${IMG}/68ba284d6e18.jpg` },
      { name: "بيض طازج 30 حبة", price: 8500, section: "ألبان", isPopular: true },
      { name: "جبن موزاريلا 500غم", price: 7000, section: "ألبان" },
      { name: "رز بسمتي 5 كغم", price: 22000, section: "بقالة" },
      { name: "زيت دوار الشمس 3 لتر", price: 14000, section: "بقالة" },
      { name: "سكر 5 كغم", price: 9000, section: "بقالة" },
      { name: "مياه معدنية 10 لتر", price: 3000, section: "مشروبات", imageUrl: `${IMG}/415686610b92.jpg` },
      { name: "شيبس كبير", price: 2000, section: "سناكس", isPopular: true },
      { name: "منظف أرضيات 2 لتر", price: 5000, section: "منظفات" },
    ],
  },
  {
    name: "سوق التمر والمكسرات – حديثة",
    description: "أفخر أنواع التمر العراقي من بساتين الأنبار — برحي، خستاوي، سعيدي ومكسرات",
    type: "MARKET",
    category: "تمر ومكسرات",
    imageUrl: `${IMG}/21703a2635e1.jpg`,
    rating: 4.8,
    deliveryFee: 500,
    deliveryTime: "30-45 دقيقة",
    minOrder: 5000,
    isOpen: true,
    isFeatured: false,
    phone: "07790123456",
    address: "حديثة – السوق القديم – قرب جامع حديثة الكبير",
    lat: 34.1338,
    lng: 42.3757,
    items: [
      { name: "تمر برحي 1 كغم", description: "تمر برحي فاخر من بساتين الأنبار", price: 12000, section: "تمر", imageUrl: `${IMG}/64c8427e58ce.jpg`, isPopular: true },
      { name: "تمر خستاوي 1 كغم", price: 15000, section: "تمر" },
      { name: "تمر سعيدي 1 كغم", price: 6000, section: "تمر" },
      { name: "مكسرات مشكلة 500غم", price: 18000, section: "مكسرات", isPopular: true },
      { name: "فستق حلبي 500غم", price: 25000, section: "مكسرات" },
      { name: "كاجو محمص 500غم", price: 20000, section: "مكسرات" },
    ],
  },
  {
    name: "حلويات الحديثة",
    description: "حلويات شرقية بيتية — كنافة وبقلاوة وزلابية وكليجة على الطريقة العراقية",
    type: "STORE",
    category: "حلويات ومخبوزات",
    imageUrl: `${IMG}/73db8d7bfbbb.jpg`,
    rating: 4.7,
    deliveryFee: 500,
    deliveryTime: "25-40 دقيقة",
    minOrder: 3000,
    isOpen: true,
    isFeatured: true,
    phone: "07702345678",
    address: "حديثة – مركز المدينة – شارع السوق",
    lat: 34.1326,
    lng: 42.3801,
    items: [
      { name: "كنافة نابلسية", description: "كنافة بالجبن والقطر تُقدم ساخنة", price: 9000, section: "حلويات", imageUrl: `${IMG}/3462a8a2da43.jpg`, isPopular: true },
      { name: "بقلاوة 1 كغم", description: "بقلاوة بالفستق والجوز", price: 22000, section: "حلويات", isPopular: true },
      { name: "زلابية بغدادية", description: "زلابية ساخنة بالقطر وحبة البركة", price: 5000, section: "حلويات", imageUrl: `${IMG}/954bd75cfbb6.jpg` },
      { name: "كليجة عراقية 1 كغم", description: "كليجة بالتمر والجوز — صنف موسمي", price: 15000, section: "حلويات" },
      { name: "خبز تنور طازج", price: 1000, section: "مخبوزات" },
    ],
  },
  {
    name: "كريم آيس للمثلجات – حديثة",
    description: "آيس كريم طبيعي وعصائر فريش — نكهات عراقية وعالمية",
    type: "STORE",
    category: "عصائر ومثلجات",
    imageUrl: `${IMG}/9f47466fb2c9.jpg`,
    rating: 4.6,
    deliveryFee: 500,
    deliveryTime: "20-35 دقيقة",
    minOrder: 2500,
    isOpen: true,
    isFeatured: false,
    phone: "07703456789",
    address: "حديثة – شارع الستين (60)",
    lat: 34.1361,
    lng: 42.3818,
    items: [
      { name: "كوب آيس كريم 3 كور", description: "اختر 3 نكهات: فانيلا، شوكولاتة، فراولة، فستق", price: 5000, section: "مثلجات", imageUrl: `${IMG}/b97d33b0f6de.jpg`, isPopular: true },
      { name: "سوندي شوكولاتة", description: "آيس كريم مع صوص شوكولاتة ساخن ومكسرات", price: 6000, section: "مثلجات", isPopular: true },
      { name: "ميلك شيك مكسرات", price: 5000, section: "مشروبات مثلجة" },
      { name: "عصير برتقال فريش", description: "برتقال طازج يُعصر عند الطلب", price: 3500, section: "مشروبات مثلجة", imageUrl: `${IMG}/f5d00fc46ec1.jpg` },
      { name: "كوكتيل فواكه", price: 5000, section: "مشروبات مثلجة" },
    ],
  },
  {
    name: "قهوة حديثة كوفي",
    description: "قهوة مختصة وأجواء دافئة على كورنيش الفرات — قهوة تركية ومشروبات مختصة",
    type: "STORE",
    category: "قهوة ومشروبات",
    imageUrl: `${IMG}/936a405a6b75.jpg`,
    rating: 4.8,
    deliveryFee: 500,
    deliveryTime: "20-35 دقيقة",
    minOrder: 2000,
    isOpen: true,
    isFeatured: false,
    phone: "07704567890",
    address: "حديثة – كورنيش الفرات",
    lat: 34.1358,
    lng: 42.3745,
    items: [
      { name: "لاتيه بارد (آيس لاتيه)", description: "إسبريسو مع حليب بارد وثلج", price: 4500, section: "قهوة مختصة", imageUrl: `${IMG}/0da8a8e1d8a7.png`, isPopular: true },
      { name: "قهوة تركية", description: "قهوة تركية أصلية على الرمل", price: 2500, section: "قهوة مختصة", isPopular: true },
      { name: "كابتشينو", price: 4000, section: "قهوة مختصة" },
      { name: "سبانش لاتيه", description: "لاتيه بحليب مكثف محلى", price: 5000, section: "قهوة مختصة", imageUrl: `${IMG}/d70e5c4581f1.jpg` },
      { name: "شاي بالنعناع", price: 1500, section: "شاي" },
      { name: "كرواسون بالشوكولاتة", price: 3000, section: "معجنات" },
    ],
  },
];

// وكلاء حديثة — سيارة أو دراجة
const AGENTS = [
  { name: "علي حسين", phone: "07811111111", vehicleType: "MOTORCYCLE", vehiclePlate: "الأنبار 44521", status: "AVAILABLE", rating: 4.9, totalDeliveries: 128, lat: 34.1315, lng: 42.379 },
  { name: "حسن كريم", phone: "07822222222", vehicleType: "MOTORCYCLE", vehiclePlate: "الأنبار 77310", status: "AVAILABLE", rating: 4.7, totalDeliveries: 96, lat: 34.1345, lng: 42.3763 },
  { name: "مصطفى جبار", phone: "07833333333", vehicleType: "CAR", vehiclePlate: "الأنبار ق م 24468", status: "AVAILABLE", rating: 4.8, totalDeliveries: 203, lat: 34.1302, lng: 42.3746 },
  { name: "أحمد سعد", phone: "07844444444", vehicleType: "CAR", vehiclePlate: "الأنبار ن ط 12297", status: "OFFLINE", rating: 4.5, totalDeliveries: 54, lat: 34.1372, lng: 42.3811 },
  { name: "مرتضى عبد الله", phone: "07855555555", vehicleType: "MOTORCYCLE", vehiclePlate: "الأنبار 90815", status: "AVAILABLE", rating: 5, totalDeliveries: 167, lat: 34.1332, lng: 42.3815 },
  { name: "سيف عمار", phone: "07866666666", vehicleType: "MOTORCYCLE", vehiclePlate: "الأنبار 35147", status: "AVAILABLE", rating: 4.6, totalDeliveries: 71, lat: 34.1289, lng: 42.3778 },
];

// مواقع عملاء داخل أحياء حديثة
const DEST_AREA = { lat: 34.1292, lng: 42.3841 }; // حي المعلمين
const DEST_AREA2 = { lat: 34.1381, lng: 42.3738 }; // حي الضباط

async function main() {
  console.log("🧹 مسح البيانات القديمة...");
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.menuItem.deleteMany();
  await db.store.deleteMany();
  await db.agent.deleteMany();
  await db.user.deleteMany();

  console.log("👤 إنشاء حساب عميل تجريبي...");
  await db.user.create({
    data: {
      name: "عميل تجريبي",
      email: "demo@yjeelak.iq",
      phone: "07900000000",
      passwordHash: hashPassword("123456"),
      address: "حديثة – حي المعلمين – قرب مدرسة الفرات",
    },
  });

  console.log("📦 إدخال متاجر مدينة حديثة والأصناف...");
  const createdStores: Prisma.StoreGetPayload<{ include: { items: true } }>[] = [];
  for (const s of DATA) {
    const store = await db.store.create({
      data: {
        name: s.name,
        description: s.description,
        type: s.type,
        category: s.category,
        imageUrl: s.imageUrl,
        rating: s.rating,
        deliveryFee: s.deliveryFee,
        deliveryTime: s.deliveryTime,
        minOrder: s.minOrder,
        isOpen: s.isOpen,
        isFeatured: s.isFeatured,
        phone: s.phone,
        address: s.address,
        lat: s.lat,
        lng: s.lng,
        items: {
          create: s.items.map((it) => ({
            name: it.name,
            description: it.description || null,
            price: it.price,
            section: it.section,
            imageUrl: it.imageUrl || null,
            isPopular: it.isPopular || false,
          })),
        },
      },
      include: { items: true },
    });
    createdStores.push(store);
  }
  console.log(`✅ ${createdStores.length} متجر داخل مدينة حديثة مع ${createdStores.reduce((n, s) => n + s.items.length, 0)} صنف`);

  console.log("🛵 إدخال وكلاء حديثة...");
  for (const a of AGENTS) {
    await db.agent.create({ data: a });
  }
  console.log(`✅ ${AGENTS.length} وكيل (سيارة ودراجة)`);

  console.log("🧾 إنشاء طلبات تجريبية...");
  const agents = await db.agent.findMany();
  const kebab = createdStores.find((s) => s.name.includes("الكبابي"))!;
  const broast = createdStores.find((s) => s.name.includes("بروست"))!;
  const zain = createdStores.find((s) => s.name.includes("سوبرماركت"))!;
  const demoUser = await db.user.findUnique({ where: { email: "demo@yjeelak.iq" } });

  // طلب 1: تم التسليم
  const o1 = kebab.items.filter((i) => ["كباب مشكل", "بيبسي"].includes(i.name));
  await db.order.create({
    data: {
      code: "TT-100001",
      customerName: "عميل تجريبي",
      customerPhone: "07900000000",
      address: "حديثة – حي المعلمين – قرب مدرسة الفرات",
      userId: demoUser?.id,
      paymentMethod: "CASH",
      status: "DELIVERED",
      storeId: kebab.id,
      agentId: agents[0].id,
      destLat: DEST_AREA.lat,
      destLng: DEST_AREA.lng,
      subtotal: o1.reduce((n, i) => n + i.price, 0),
      deliveryFee: kebab.deliveryFee,
      total: o1.reduce((n, i) => n + i.price, 0) + kebab.deliveryFee,
      items: { create: o1.map((i) => ({ name: i.name, price: i.price, quantity: 1 })) },
    },
  });

  // طلب 2: قيد التوصيل الآن — السائق متحرك على خريطة حديثة
  const o2 = broast.items.filter((i) => ["وجبة بروست نصف دجاجة", "بيبسي كبير"].includes(i.name));
  const eta2 = etaMinutesFor(haversineKm({ lat: broast.lat ?? HADITHA_CENTER.lat, lng: broast.lng ?? HADITHA_CENTER.lng }, DEST_AREA), agents[2].vehicleType);
  await db.order.create({
    data: {
      code: "TT-100002",
      customerName: "عميل تجريبي",
      customerPhone: "07900000000",
      address: "حديثة – حي المعلمين – قرب صيدلية النور",
      notes: "اتصلوا عند الوصول",
      userId: demoUser?.id,
      paymentMethod: "CARD",
      status: "DELIVERING",
      storeId: broast.id,
      agentId: agents[2].id,
      destLat: DEST_AREA.lat,
      destLng: DEST_AREA.lng,
      deliveringAt: new Date(Date.now() - 2.5 * 60 * 1000),
      etaMinutes: eta2,
      subtotal: o2.reduce((n, i) => n + i.price, 0),
      deliveryFee: broast.deliveryFee,
      total: o2.reduce((n, i) => n + i.price, 0) + broast.deliveryFee,
      items: { create: o2.map((i) => ({ name: i.name, price: i.price, quantity: 1 })) },
    },
  });

  // طلب 3: جديد بانتظار القبول
  const o3 = zain.items.filter((i) => ["حليب نضارة 1 لتر", "بيض طازج 30 حبة", "رز بسمتي 5 كغم"].includes(i.name));
  await db.order.create({
    data: {
      code: "TT-100003",
      customerName: "أم محمد",
      customerPhone: "07770000003",
      address: "حديثة – حي الضباط – قرب مسجد الرحمن",
      paymentMethod: "CASH",
      status: "PENDING",
      storeId: zain.id,
      destLat: DEST_AREA2.lat,
      destLng: DEST_AREA2.lng,
      subtotal: o3.reduce((n, i) => n + i.price, 0),
      deliveryFee: zain.deliveryFee,
      total: o3.reduce((n, i) => n + i.price, 0) + zain.deliveryFee,
      items: { create: o3.map((i) => ({ name: i.name, price: i.price, quantity: i.name === "حليب نضارة 1 لتر" ? 2 : 1 })) },
    },
  });
  console.log("✅ 3 طلبات تجريبية (منها طلب قيد التوصيل لعرض التتبع المباشر)");

  console.log("🎉 تمت تهيئة بيانات مدينة حديثة بنجاح!");
}

main()
  .catch((e) => {
    console.error("❌ خطأ في التهيئة:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
