import { Store, ShippingRate, FAQ, StaticPage } from '../types';

// ============================================
// Stores Seed Data
// ============================================

export const stores: Store[] = [
  {
    id: 'store-001',
    nameAr: 'Smart Store - مدينة نصر',
    nameEn: 'Smart Store - Nasr City',
    slug: 'nasr-city',
    phone: '0228101234',
    email: 'nasr@smartstore.com',
    address: 'شارع مصطفى النحاس، مدينة نصر، القاهرة',
    city: 'مدينة نصر',
    governorate: 'القاهرة',
    latitude: 30.0571,
    longitude: 31.3397,
    workingHours: {
      saturday: { open: '10:00', close: '22:00', isClosed: false },
      sunday: { open: '10:00', close: '22:00', isClosed: false },
      monday: { open: '10:00', close: '22:00', isClosed: false },
      tuesday: { open: '10:00', close: '22:00', isClosed: false },
      wednesday: { open: '10:00', close: '22:00', isClosed: false },
      thursday: { open: '10:00', close: '22:00', isClosed: false },
      friday: { open: '14:00', close: '22:00', isClosed: false },
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'store-002',
    nameAr: 'Smart Store - سيتي ستارز',
    nameEn: 'Smart Store - City Stars',
    slug: 'city-stars',
    phone: '0224804567',
    email: 'citystars@smartstore.com',
    address: 'مول سيتي ستارز، طريق النزهة، القاهرة',
    city: 'مدينة نصر',
    governorate: 'القاهرة',
    latitude: 30.0268,
    longitude: 31.3437,
    workingHours: {
      saturday: { open: '10:00', close: '23:00', isClosed: false },
      sunday: { open: '10:00', close: '23:00', isClosed: false },
      monday: { open: '10:00', close: '23:00', isClosed: false },
      tuesday: { open: '10:00', close: '23:00', isClosed: false },
      wednesday: { open: '10:00', close: '23:00', isClosed: false },
      thursday: { open: '10:00', close: '23:00', isClosed: false },
      friday: { open: '14:00', close: '23:00', isClosed: false },
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'store-003',
    nameAr: 'Smart Store - الأسكندرية',
    nameEn: 'Smart Store - Alexandria',
    slug: 'alexandria',
    phone: '0334567890',
    email: 'alex@smartstore.com',
    address: 'شارع الشركات، سيدي جابر، الإسكندرية',
    city: 'الإسكندرية',
    governorate: 'الإسكندرية',
    latitude: 31.2001,
    longitude: 29.9187,
    workingHours: {
      saturday: { open: '10:00', close: '22:00', isClosed: false },
      sunday: { open: '10:00', close: '22:00', isClosed: false },
      monday: { open: '10:00', close: '22:00', isClosed: false },
      tuesday: { open: '10:00', close: '22:00', isClosed: false },
      wednesday: { open: '10:00', close: '22:00', isClosed: false },
      thursday: { open: '10:00', close: '22:00', isClosed: false },
      friday: { open: '14:00', close: '22:00', isClosed: false },
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'store-004',
    nameAr: 'Smart Store - الجيزة',
    nameEn: 'Smart Store - Giza',
    slug: 'giza',
    phone: '0237654321',
    email: 'giza@smartstore.com',
    address: 'شارع الهرم، الجيزة',
    city: 'الجيزة',
    governorate: 'الجيزة',
    latitude: 29.9773,
    longitude: 31.1325,
    workingHours: {
      saturday: { open: '10:00', close: '22:00', isClosed: false },
      sunday: { open: '10:00', close: '22:00', isClosed: false },
      monday: { open: '10:00', close: '22:00', isClosed: false },
      tuesday: { open: '10:00', close: '22:00', isClosed: false },
      wednesday: { open: '10:00', close: '22:00', isClosed: false },
      thursday: { open: '10:00', close: '22:00', isClosed: false },
      friday: { open: '14:00', close: '22:00', isClosed: false },
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// Shipping Rates Seed Data
// ============================================

export const shippingRates: ShippingRate[] = [
  {
    id: 'ship-001',
    nameAr: 'توصيل عادي - القاهرة',
    nameEn: 'Standard Delivery - Cairo',
    governorate: 'القاهرة',
    price: 5000, // EGP 50
    freeShippingThreshold: 50000, // Free over EGP 500
    estimatedDays: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ship-002',
    nameAr: 'توصيل عادي - المحافظات',
    nameEn: 'Standard Delivery - Governorates',
    governorate: '*',
    price: 7500, // EGP 75
    freeShippingThreshold: 75000, // Free over EGP 750
    estimatedDays: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ship-003',
    nameAr: 'توصيل سريع - القاهرة',
    nameEn: 'Express Delivery - Cairo',
    governorate: 'القاهرة',
    price: 10000, // EGP 100
    estimatedDays: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// FAQs Seed Data
// ============================================

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    questionAr: 'كم يستغرق التوصيل؟',
    questionEn: 'How long does delivery take?',
    answerAr: 'التوصيل العادي يستغرق 3-5 أيام عمل داخل القاهرة والجيزة، و5-7 أيام عمل للمحافظات الأخرى. التوصيل السريع يصلك خلال يوم واحد.',
    answerEn: 'Standard delivery takes 3-5 business days in Cairo and Giza, and 5-7 business days for other governorates. Express delivery arrives within one day.',
    category: 'shipping',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-002',
    questionAr: 'هل يمكنني إرجاع المنتج؟',
    questionEn: 'Can I return a product?',
    answerAr: 'نعم، يمكنك إرجاع المنتج خلال 14 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية وغير مستخدم.',
    answerEn: 'Yes, you can return the product within 14 days of delivery, provided it is in its original condition and unused.',
    category: 'returns',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-003',
    questionAr: 'ما هي طرق الدفع المتاحة؟',
    questionEn: 'What payment methods are available?',
    answerAr: 'نقبل البطاقات الائتمانية (فيزا، ماستركارد)، فودافون كاش، أورانج كاش، إتصالات كاش، إنستاباي، الدفع عند الاستلام، والتقسيط عبر valU.',
    answerEn: 'We accept credit cards (Visa, Mastercard), Vodafone Cash, Orange Cash, Etisalat Cash, InstaPay, Cash on Delivery, and installments via valU.',
    category: 'payment',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-004',
    questionAr: 'كيف أختار المقاس المناسب؟',
    questionEn: 'How do I choose the right size?',
    answerAr: 'يمكنك الاطلاع على دليل المقاسات في كل صفحة منتج. قيس طول قدمك بالسنتيمتر وقارنه بالجدول.',
    answerEn: 'You can refer to the size guide on each product page. Measure your foot length in centimeters and compare it to the table.',
    category: 'products',
    sortOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-005',
    questionAr: 'هل التوصيل مجاني؟',
    questionEn: 'Is delivery free?',
    answerAr: 'نعم، التوصيل مجاني للطلبات فوق 500 جنيه داخل القاهرة، وفوق 750 جنيه للمحافظات الأخرى.',
    answerEn: 'Yes, delivery is free for orders over 500 EGP in Cairo and over 750 EGP for other governorates.',
    category: 'shipping',
    sortOrder: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-006',
    questionAr: 'هل أستطيع تتبع طلبي؟',
    questionEn: 'Can I track my order?',
    answerAr: 'نعم، يمكنك تتبع طلبك من خلال صفحة "طلباتي" في حسابك أو عبر رابط التتبع الذي يصلك على البريد الإلكتروني.',
    answerEn: 'Yes, you can track your order through the "My Orders" page in your account or via the tracking link sent to your email.',
    category: 'orders',
    sortOrder: 6,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-007',
    questionAr: 'هل يوجد تقسيط؟',
    questionEn: 'Do you offer installments?',
    answerAr: 'نعم، يمكنك التقسيط عبر valU وUBFS وبنك مصر بدون فوائد على 3-6 شهور.',
    answerEn: 'Yes, you can pay in installments via valU, UBFS, and Banco Misr interest-free on 3-6 months.',
    category: 'payment',
    sortOrder: 7,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'faq-008',
    questionAr: 'ماذا لو كان المقاس غير مناسب؟',
    questionEn: 'What if the size is not suitable?',
    answerAr: 'يمكنك استبدال المقاس مجاناً خلال 14 يوم من الاستلام. اتصل بنا وسنرتب الاستبدال لك.',
    answerEn: 'You can exchange the size for free within 14 days of delivery. Contact us and we will arrange the exchange for you.',
    category: 'returns',
    sortOrder: 8,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ============================================
// Static Pages Seed Data
// ============================================

export const staticPages: StaticPage[] = [
  {
    id: 'page-001',
    titleAr: 'عن Smart Store',
    titleEn: 'About Smart Store',
    slugAr: 'about-us',
    slugEn: 'about-us',
    contentAr: `
# عن Smart Store

مرحباً بكم في **Smart Store** - وجهتكم المثالية للأحذية في مصر!

## من نحن

تأسست Smart Store في عام 2024 بهدف تقديم أفضل تشكيلة من الأحذية العصرية والمريحة للسوق المصري. نعمل مع أكبر العلامات التجارية العالمية مثل Nike وAdidas وPuma لنوفر لكم المنتجات الأصلية بأفضل الأسعار.

## رؤيتنا

نريد أن نكون الخيار الأول لكل مصري يبحث عن أحذية عالية الجودة بأسعار مناسبة، مع تجربة تسوق مريحة وسلسة أونلاين وفي فروعنا.

## قيمنا

- **الجودة**: منتجات أصلية 100% من موزعين معتمدين
- **الخدمة**: فريق دعم متواجد لمساعدتك دائماً
- **الراحة**: تجربة تسوق سهلة وسريعة
- **الثقة**: سياسة إرجاع واستبدال مرنة
    `,
    contentEn: `
# About Smart Store

Welcome to **Smart Store** - your ideal destination for shoes in Egypt!

## Who We Are

Smart Store was founded in 2024 with the goal of bringing the best collection of modern and comfortable shoes to the Egyptian market. We work with top global brands like Nike, Adidas, and Puma to bring you authentic products at the best prices.

## Our Vision

We aim to be the first choice for every Egyptian looking for high-quality shoes at affordable prices, with a comfortable and seamless shopping experience online and in our stores.

## Our Values

- **Quality**: 100% authentic products from authorized distributors
- **Service**: Support team always ready to help you
- **Comfort**: Easy and fast shopping experience
- **Trust**: Flexible return and exchange policy
    `,
    metaTitleAr: 'عن Smart Store - متجر أحذية مصري',
    metaDescriptionAr: 'تعرف على Smart Store - متجر أحذية مصري يقدم أفضل العلامات التجارية العالمية بأسعار مناسبة',
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'page-002',
    titleAr: 'سياسة الشحن والتوصيل',
    titleEn: 'Shipping & Delivery Policy',
    slugAr: 'shipping-policy',
    slugEn: 'shipping-policy',
    contentAr: `
# سياسة الشحن والتوصيل

## مناطق التوصيل

نقوم بالتوصيل لجميع المحافظات في جمهورية مصر العربية.

## أسعار التوصيل

| المنطقة | السعر | الحد الأدنى للتوصيل المجاني |
|---------|-------|----------------------------|
| القاهرة والجيزة | 50 جنيه | 500 جنيه |
| الإسكندرية والمحافظات | 75 جنيه | 750 جنيه |
| باقي المحافظات | 75 جنيه | 750 جنيه |

## أوقات التوصيل

- **التوصيل العادي**: 3-5 أيام عمل
- **التوصيل السريع**: يوم واحد (القاهرة فقط)

## ملاحظات

- الطلبات تُقبل أيام السبت إلى الخميس
- الطلبات بعد الساعة 2 ظهراً تُعالج في اليوم التالي
- يمكنك تتبع طلبك من صفحة "طلباتي"
    `,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'page-003',
    titleAr: 'سياسة الإرجاع والاستبدال',
    titleEn: 'Return & Exchange Policy',
    slugAr: 'return-policy',
    slugEn: 'return-policy',
    contentAr: `
# سياسة الإرجاع والاستبدال

## مدة الإرجاع

يمكنك إرجاع أو استبدال المنتج خلال **14 يوم** من تاريخ استلام الطلب.

## شروط الإرجاع

- المنتج يجب أن يكون في حالته الأصلية
- المنتج يجب أن يكون غير مستخدم
- يجب ارتداء المنتج على سجادة نظيفة فقط
- العبوة الأصلية يجب أن تكون سليمة

## كيفية الإرجاع

1. تواصل مع فريق الدعم عبر واتساب أو الهاتف
2. اذكر رقم الطلب وسبب الإرجاع
3. سنقوم بترتيب الاستلام من بابك
4. يتم رد المبلغ خلال 7 أيام عمل

## الاستبدال

يمكنك استبدال المقاس أو اللون مجاناً خلال 14 يوم.

## استثناءات

- المنتجات التالفة أو المستخدمة لا يمكن إرجاعها
- المنتجات عليها خصومات خاصة لا يمكن إرجاعها إلا لعيب في الصناعة
    `,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'page-004',
    titleAr: 'دليل المقاسات',
    titleEn: 'Size Guide',
    slugAr: 'size-guide',
    slugEn: 'size-guide',
    contentAr: `
# دليل المقاسات

## كيفية قياس طول قدمك

1. قف على ورقة بيضاء
2. قُم بueار قدمك بالقلم
3. قِس المسافة من أصابع قدمك إلى كعب قدمك بالسنتيمتر
4. استخدم الجدول أدناه لتحديد المقاس

## جدول مقاسات الرجال

| طول القدم (سم) | المقاس الأوروبي | المقاس الأمريكي | المقاس البريطاني |
|---------------|----------------|----------------|----------------|
| 24.0 | 38 | 6 | 5.5 |
| 24.5 | 39 | 6.5 | 6 |
| 25.0 | 40 | 7 | 6.5 |
| 25.5 | 41 | 7.5 | 7 |
| 26.0 | 42 | 8 | 7.5 |
| 26.5 | 43 | 8.5 | 8 |
| 27.0 | 44 | 9 | 8.5 |
| 27.5 | 45 | 9.5 | 9 |
| 28.0 | 46 | 10 | 9.5 |

## جدول مقاسات النساء

| طول القدم (سم) | المقاس الأوروبي | المقاس الأمريكي | المقاس البريطاني |
|---------------|----------------|----------------|----------------|
| 22.0 | 35 | 5 | 2.5 |
| 22.5 | 36 | 5.5 | 3 |
| 23.0 | 37 | 6 | 3.5 |
| 23.5 | 38 | 6.5 | 4 |
| 24.0 | 39 | 7 | 4.5 |
| 24.5 | 40 | 7.5 | 5 |
| 25.0 | 41 | 8 | 5.5 |
    `,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
