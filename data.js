// ============================================================
// KHAN FURNITURE — product data
// EDIT HERE to add products, change prices, or update descriptions.
// Each product needs: id, category, name{en,ur}, desc{en,ur}, price, colors[]
// "hotspot" (x,y,z) positions the clickable marker inside the 3D showroom —
// only products with a hotspot appear as clickable points in the 3D scene.
// ============================================================

const WHATSAPP_NUMBER = "923299920992"; // country code + number, no + or spaces

const PRODUCTS = [
  // ---------------- BEDROOM ----------------
  {
    id: "king-bed",
    category: "bedroom",
    name: { en: "King Size Bed", ur: "کنگ سائز بیڈ" },
    desc: {
      en: "Elegant wooden design with premium finishing, built for lasting comfort.",
      ur: "خوبصورت لکڑی کے ڈیزائن اور بہترین فنشنگ کے ساتھ، دیرپا آرام کے لیے تیار کردہ۔"
    },
    price: "PKR 85,000", // EDIT PRICE HERE
    colors: ["#5a3a22", "#8a5a34", "#2c1c14"],
    hotspot: { x: -2.4, y: 1.0, z: -1.6 },
    featured: true
  },
  {
    id: "bedroom-set",
    category: "bedroom",
    name: { en: "Bedroom Set", ur: "بیڈ روم سیٹ" },
    desc: {
      en: "A complete matching bedroom set combining tradition with modern lines.",
      ur: "روایت اور جدید انداز کا امتزاج، مکمل میچنگ بیڈ روم سیٹ۔"
    },
    price: "PKR 165,000",
    colors: ["#5a3a22", "#3d2818"],
    hotspot: { x: -3.4, y: 0.9, z: -2.2 }
  },
  {
    id: "dressing-table",
    category: "bedroom",
    name: { en: "Dressing Table", ur: "ڈریسنگ ٹیبل" },
    desc: {
      en: "Spacious mirror-fitted dressing table with smooth-glide drawers.",
      ur: "آئینے کے ساتھ کشادہ ڈریسنگ ٹیبل، آسانی سے کھلنے والی درازوں کے ساتھ۔"
    },
    price: "PKR 42,000",
    colors: ["#8a5a34", "#e0b563"],
    hotspot: { x: -1.2, y: 1.1, z: -3.0 },
    featured: true
  },
  {
    id: "side-tables",
    category: "bedroom",
    name: { en: "Side Tables", ur: "سائیڈ ٹیبلز" },
    desc: {
      en: "Compact bedside tables with a drawer and open shelf for essentials.",
      ur: "دراز اور کھلے خانے کے ساتھ کمپیکٹ سائیڈ ٹیبل۔"
    },
    price: "PKR 14,500",
    colors: ["#5a3a22", "#a4713f"],
    hotspot: { x: -3.9, y: 0.6, z: -1.4 }
  },
  {
    id: "wardrobe",
    category: "bedroom",
    name: { en: "Wardrobe", ur: "وارڈروب" },
    desc: {
      en: "Spacious multi-door wardrobe with organised shelving and hanging space.",
      ur: "منظم خانوں اور ہینگنگ اسپیس کے ساتھ کشادہ ملٹی ڈور وارڈروب۔"
    },
    price: "PKR 95,000",
    colors: ["#3d2818", "#2c1c14"],
    hotspot: { x: -3.7, y: 1.4, z: -3.6 },
    featured: true
  },

  // ---------------- LIVING ROOM ----------------
  {
    id: "sofa-set",
    category: "living",
    name: { en: "Sofa Set", ur: "صوفہ سیٹ" },
    desc: {
      en: "Deep-seated sofa set upholstered in premium fabric over a solid wood frame.",
      ur: "ٹھوس لکڑی کے فریم پر معیاری کپڑے سے تیار کردہ آرام دہ صوفہ سیٹ۔"
    },
    price: "PKR 145,000",
    colors: ["#5a3a22", "#8a5a34", "#c9973d"],
    hotspot: { x: 1.6, y: 0.8, z: -1.4 },
    featured: true
  },
  {
    id: "coffee-table",
    category: "living",
    name: { en: "Coffee Table", ur: "سینٹر ٹیبل" },
    desc: {
      en: "Solid wood centre table with a warm hand-finished polish.",
      ur: "ہاتھ سے تیار کردہ بہترین پالش کے ساتھ ٹھوس لکڑی کا سینٹر ٹیبل۔"
    },
    price: "PKR 22,000",
    colors: ["#8a5a34", "#3d2818"],
    hotspot: { x: 1.9, y: 0.5, z: -0.6 }
  },
  {
    id: "tv-unit",
    category: "living",
    name: { en: "TV Unit", ur: "ٹی وی یونٹ" },
    desc: {
      en: "Wide media console with closed storage and open display shelves.",
      ur: "بند اسٹوریج اور کھلے شیلف کے ساتھ کشادہ ٹی وی یونٹ۔"
    },
    price: "PKR 48,000",
    colors: ["#2c1c14", "#5a3a22"],
    hotspot: { x: 2.8, y: 0.9, z: -2.4 },
    featured: true
  },
  {
    id: "showcase",
    category: "living",
    name: { en: "Showcase Cabinet", ur: "شوکیس" },
    desc: {
      en: "Glass-front showcase cabinet for displaying crockery and keepsakes.",
      ur: "برتن اور یادگار اشیاء سجانے کے لیے شیشے والا شوکیس۔"
    },
    price: "PKR 55,000",
    colors: ["#3d2818", "#8a5a34"],
    hotspot: { x: 3.3, y: 1.2, z: -1.2 }
  },

  // ---------------- DINING ----------------
  {
    id: "dining-table",
    category: "dining",
    name: { en: "Dining Table", ur: "ڈائننگ ٹیبل" },
    desc: {
      en: "Generous solid-wood dining table finished for daily family use.",
      ur: "روزمرہ خاندانی استعمال کے لیے تیار کردہ کشادہ ٹھوس لکڑی کا ڈائننگ ٹیبل۔"
    },
    price: "PKR 68,000",
    colors: ["#5a3a22", "#8a5a34"],
    hotspot: { x: 0.2, y: 0.75, z: 2.6 },
    featured: true
  },
  {
    id: "dining-chairs",
    category: "dining",
    name: { en: "Dining Chairs", ur: "ڈائننگ چیئرز" },
    desc: {
      en: "Set of matching upholstered dining chairs with a comfortable back rest.",
      ur: "آرام دہ کمر ٹیک کے ساتھ میچنگ ڈائننگ چیئرز کا سیٹ۔"
    },
    price: "PKR 9,500 / chair",
    colors: ["#3d2818", "#c9973d"],
    hotspot: { x: 0.9, y: 0.5, z: 2.9 }
  },
  {
    id: "dining-set",
    category: "dining",
    name: { en: "Complete Dining Set", ur: "مکمل ڈائننگ سیٹ" },
    desc: {
      en: "Table and six chairs together, crafted from matching solid wood.",
      ur: "میز اور چھ کرسیاں، ایک ہی میچنگ ٹھوس لکڑی سے تیار کردہ۔"
    },
    price: "PKR 115,000",
    colors: ["#5a3a22", "#2c1c14"],
    hotspot: { x: -0.6, y: 0.75, z: 3.3 },
    featured: true
  },

  // ---------------- CUSTOM ----------------
  {
    id: "custom",
    category: "custom",
    name: { en: "Custom Wooden Furniture", ur: "کسٹم وڈن فرنیچر" },
    desc: {
      en: "Tell us your size, wood and finish — we build it to your exact requirement.",
      ur: "اپنی پسند کا سائز، لکڑی اور فنشنگ بتائیں — ہم آپ کی ضرورت کے مطابق تیار کریں گے۔"
    },
    price: "PKR — on request",
    colors: ["#5a3a22", "#8a5a34", "#c9973d", "#2c1c14"]
  }
];

function waLink(productNameEn, productNameUr, lang){
  const msg = lang === "ur"
    ? `السلام علیکم خان فرنیچر، مجھے ${productNameUr} میں دلچسپی ہے۔ براہ کرم تفصیلات اور قیمت بتا دیں۔`
    : `Hello Khan Furniture, I am interested in your ${productNameEn}. Please share details and price.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
