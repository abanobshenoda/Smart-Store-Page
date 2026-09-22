// ============================================
// User & Auth Types
// ============================================

export type UserRole = 'customer' | 'pos' | 'manager' | 'admin' | 'superadmin';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  firstNameAr: string;
  lastNameAr: string;
  firstNameEn?: string;
  lastNameEn?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female';
  loyaltyPoints: number;
  totalSpent: number;
  orderCount: number;
  group: CustomerGroup;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerGroup = 'regular' | 'vip' | 'wholesale';

export interface Address {
  id: string;
  userId: string;
  label: string; // Home, Office, etc.
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  governorate: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}

// ============================================
// Product Types
// ============================================

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  slugAr: string;
  slugEn: string;
  descriptionAr: string;
  descriptionEn?: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  brandId: string;
  basePrice: number; // in EGP cents
  costPrice?: number;
  salePrice?: number;
  currency: 'EGP';
  taxRate: number; // 14% VAT
  weight?: number; // in grams
  status: ProductStatus;
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  metaTitleAr?: string;
  metaDescriptionAr?: string;
  metaTitleEn?: string;
  metaDescriptionEn?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export type ProductStatus = 'draft' | 'active' | 'inactive' | 'out_of_stock';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: string; // 39, 40, 41, etc.
  color: string;
  colorHex: string;
  price: number;
  salePrice?: number;
  stock: number;
  reservedStock: number;
  lowStockThreshold: number;
  weight?: number;
  images: ProductImage[];
  model3D?: string; // 3D model URL
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  variantId?: string;
  url: string;
  altAr: string;
  altEn?: string;
  width: number;
  height: number;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slugAr: string;
  slugEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  metaTitleAr?: string;
  metaDescriptionAr?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  logo?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  website?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Cart Types
// ============================================

export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  couponCode?: string;
  couponDiscount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: 'EGP';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  salePrice?: number;
  total: number;
  product?: Product;
  variant?: ProductVariant;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Order Types
// ============================================

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready_to_ship'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export type PaymentMethod =
  | 'credit_card'
  | 'debit_card'
  | 'fawry'
  | 'instapay'
  | 'vodafone_cash'
  | 'orange_cash'
  | 'etisalat_cash'
  | 'cod'
  | 'bank_transfer'
  | 'valU'
  | 'ubfs'
  | 'banco_misr';

export interface Order {
  id: string;
  orderNumber: string; // SS-2024-001234
  userId?: string;
  guestEmail?: string;
  guestPhone?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  currency: 'EGP';
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  notes?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  shippingCompany?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productNameAr: string;
  productNameEn?: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  salePrice?: number;
  discount: number;
  total: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  note?: string;
  createdAt: Date;
  createdBy?: string;
}

// ============================================
// POS Types
// ============================================

export interface POSRegister {
  id: string;
  storeId: string;
  name: string;
  status: 'open' | 'closed';
  openedAt?: Date;
  closedAt?: Date;
  openedBy?: string;
  closedBy?: string;
  openingBalance: number;
  closingBalance?: number;
  expectedBalance?: number;
  difference?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface POSTransaction {
  id: string;
  registerId: string;
  orderId: string;
  type: 'sale' | 'return' | 'exchange';
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
  change: number;
  cashierId: string;
  customerId?: string;
  receiptNumber: string;
  createdAt: Date;
}

export interface POSDiscount {
  id: string;
  code: string;
  nameAr: string;
  nameEn?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Store Types
// ============================================

export interface Store {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  governorate: string;
  latitude: number;
  longitude: number;
  workingHours: WorkingHours;
  isActive: boolean;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkingHours {
  saturday: TimeRange;
  sunday: TimeRange;
  monday: TimeRange;
  tuesday: TimeRange;
  wednesday: TimeRange;
  thursday: TimeRange;
  friday: TimeRange;
}

export interface TimeRange {
  open: string; // "10:00"
  close: string; // "22:00"
  isClosed: boolean;
}

export interface StoreTransfer {
  id: string;
  fromStoreId: string;
  toStoreId: string;
  status: 'pending' | 'in_transit' | 'received' | 'cancelled';
  items: StoreTransferItem[];
  notes?: string;
  createdBy: string;
  receivedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  receivedAt?: Date;
}

export interface StoreTransferItem {
  id: string;
  transferId: string;
  variantId: string;
  quantity: number;
  receivedQuantity?: number;
}

// ============================================
// Inventory Types
// ============================================

export interface InventoryAdjustment {
  id: string;
  variantId: string;
  type: 'increase' | 'decrease' | 'set';
  quantity: number;
  reason: string;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface InventoryCount {
  id: string;
  storeId?: string;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  items: InventoryCountItem[];
  notes?: string;
  createdBy: string;
  completedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface InventoryCountItem {
  id: string;
  countId: string;
  variantId: string;
  systemQuantity: number;
  countedQuantity?: number;
  difference?: number;
  notes?: string;
}

// ============================================
// Loyalty & Points Types
// ============================================

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  points: number;
  balance: number;
  referenceType?: 'order' | 'promotion' | 'manual';
  referenceId?: string;
  description: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface LoyaltyRule {
  id: string;
  nameAr: string;
  nameEn?: string;
  type: 'earn' | 'redeem';
  pointsPerEGP: number; // e.g., 1 point per 10 EGP
  minOrderAmount?: number;
  maxPointsPerOrder?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Promotion Types
// ============================================

export interface Promotion {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  type: PromotionType;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  applicableTo: 'all' | 'categories' | 'products' | 'brands';
  categoryIds?: string[];
  productIds?: string[];
  brandIds?: string[];
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  bannerImage?: string;
  theme?: PromotionTheme;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PromotionType =
  | 'flash_sale'
  | 'bundle'
  | 'seasonal'
  | 'welcome'
  | 'birthday'
  | 'student'
  | 'loyalty'
  | 'referral';

export interface PromotionTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundImage?: string;
}

export interface FlashSale {
  id: string;
  promotionId: string;
  startTime: Date;
  endTime: Date;
  maxQuantity?: number;
  soldQuantity: number;
  status: 'upcoming' | 'active' | 'ended';
  createdAt: Date;
  updatedAt: Date;
}

export interface Bundle {
  id: string;
  promotionId: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  bundlePrice: number;
  originalPrice: number;
  savings: number;
  items: BundleItem[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BundleItem {
  id: string;
  bundleId: string;
  productId: string;
  variantId?: string;
  quantity: number;
}

// ============================================
// Review Types
// ============================================

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId?: string;
  rating: number; // 1-5
  title?: string;
  comment: string;
  images?: string[];
  status: ReviewStatus;
  helpful: number;
  reply?: string;
  repliedAt?: Date;
  repliedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Wishlist Types
// ============================================

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: Date;
}

// ============================================
// Recently Viewed Types
// ============================================

export interface RecentlyViewed {
  id: string;
  userId?: string;
  sessionId: string;
  productId: string;
  viewedAt: Date;
  product?: Product;
}

// ============================================
// Newsletter Types
// ============================================

export interface NewsletterSubscriber {
  id: string;
  email: string;
  userId?: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

// ============================================
// Static Page Types
// ============================================

export interface StaticPage {
  id: string;
  titleAr: string;
  titleEn?: string;
  slugAr: string;
  slugEn?: string;
  contentAr: string;
  contentEn?: string;
  metaTitleAr?: string;
  metaDescriptionAr?: string;
  metaTitleEn?: string;
  metaDescriptionEn?: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// FAQ Types
// ============================================

export interface FAQ {
  id: string;
  questionAr: string;
  questionEn?: string;
  answerAr: string;
  answerEn?: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Shipping Types
// ============================================

export interface ShippingRate {
  id: string;
  nameAr: string;
  nameEn?: string;
  governorate: string;
  minWeight?: number;
  maxWeight?: number;
  minOrderAmount?: number;
  price: number;
  freeShippingThreshold?: number;
  estimatedDays: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingZone {
  id: string;
  nameAr: string;
  nameEn?: string;
  governorates: string[];
  baseRate: number;
  perKgRate: number;
  freeShippingThreshold: number;
  estimatedDays: number;
  isActive: boolean;
}

// ============================================
// Abandoned Cart Types
// ============================================

export interface AbandonedCart {
  id: string;
  cartId: string;
  userId?: string;
  email?: string;
  phone?: string;
  status: 'detected' | 'email_sent' | 'recovered' | 'expired';
  reminderCount: number;
  lastReminderAt?: Date;
  recoveredAt?: Date;
  recoveredOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Settings Types
// ============================================

export interface StoreSettings {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  category: string;
  description?: string;
  updatedAt: Date;
  updatedBy?: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

export interface SalesReport {
  date: string;
  sales: number;
  orders: number;
  averageOrderValue: number;
}

export interface ProductReport {
  productId: string;
  productName: string;
  totalSold: number;
  totalRevenue: number;
  averageRating: number;
}

export interface CustomerReport {
  userId: string;
  customerName: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  loyaltyPoints: number;
}

// ============================================
// Search Types
// ============================================

export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  filters: {
    categories: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    sizes: { name: string; count: number }[];
    colors: { name: string; hex: string; count: number }[];
    priceRange: { min: number; max: number };
  };
}
