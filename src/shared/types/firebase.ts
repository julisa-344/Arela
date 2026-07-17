import { Timestamp } from 'firebase/firestore';

// ============= PRODUCTO =============
export interface ProductVariant {
  id: string;
  name: string; // Ej: "Rosa Claro", "50ml", "Tono 02"
  sku: string;
  price: number;
  compareAtPrice?: number; // Precio antes de oferta
  stock: number;
  images: string[];
  attributes: Record<string, string>; // { "color": "rosa", "tamaño": "50ml" }
}

export interface ProductIngredient {
  name: string; // Ej: "Aceite de Jojoba"
  description: string; // Ej: "Retiene la hidratación y suaviza la piel seca."
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  brandId: string;
  brandName: string;
  
  // Variantes
  hasVariants: boolean;
  variants: ProductVariant[];
  
  // Precio base (si no tiene variantes)
  basePrice?: number;
  compareAtPrice?: number;
  baseSku?: string;
  baseStock?: number;
  
  // Imágenes
  images: string[];
  thumbnail: string;
  
  // Beneficios y características
  benefits: string[]; // ["Hidratación 24h", "Antiarrugas"]
  ingredients?: string[];
  howToUse?: string;
  compositionIngredients?: ProductIngredient[];
  resultOfApplication?: string;
  texture?: string;
  aroma?: string;
  
  // SEO y metadata
  tags: string[];
  metaDescription?: string;
  
  // Control
  isActive: boolean;
  isFeatured: boolean; // Para "best sellers"
  isNew: boolean;
  
  // Ofertas
  hasPromotion: boolean;
  promotionId?: string;
  
  // Stats
  viewsCount: number;
  salesCount: number;
  averageRating?: number;
  reviewsCount?: number;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============= CATEGORÍA =============
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string; // Para subcategorías
  order: number;
  isActive: boolean;
  productCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============= MARCA =============
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
  productCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============= OFERTAS/PROMOCIONES =============
export type PromotionType = 'fixed_price' | 'percentage' | 'buy_x_get_y' | 'promo_code';

export interface Promotion {
  id: string;
  name: string;
  description?: string;
  type: PromotionType;
  
  // Descuentos
  discountAmount?: number; // Para fixed_price (nuevo precio)
  discountPercentage?: number; // Para percentage
  
  // Para 2x1, 3x2
  buyQuantity?: number; // Compra X
  getQuantity?: number; // Lleva Y
  
  // Código promocional
  code?: string;
  
  // Aplicabilidad
  applicableToAllProducts: boolean;
  productIds: string[]; // IDs de productos incluidos
  categoryIds: string[]; // IDs de categorías incluidas
  brandIds: string[]; // IDs de marcas incluidas
  
  // Vigencia
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean;
  
  // Límites
  usageLimit?: number; // Cuántas veces se puede usar en total
  usageCount: number;
  perUserLimit?: number; // Cuántas veces por usuario
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============= USUARIO =============
export interface UserAddress {
  id: string;
  label: string; // "Casa", "Oficina", etc.
  fullName: string;
  phone: string;
  street: string;
  reference?: string;
  district: string;
  city: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface User {
  id: string; // Firebase Auth UID
  email: string;
  displayName: string;
  phone?: string;
  photoURL?: string;
  
  // Direcciones
  addresses: UserAddress[];
  
  // Wishlist
  wishlist: string[]; // Array de product IDs
  
  // Sistema de puntos
  rewardPoints: number;
  totalSpent: number;
  
  // Metadata
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
}

// ============= PEDIDO =============
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'transferencia' | 'yape' | 'plin';
export type ShippingMethod = 'olva_courier' | 'motorizado' | 'pickup_surquillo' | 'pickup_lince';

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  variantId?: string;
  variantName?: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnail: string;
  
  // Si tuvo promoción aplicada
  promotionApplied?: {
    promotionId: string;
    promotionName: string;
    discount: number;
  };
}

export interface Order {
  id: string;
  orderNumber: string; // Ej: "ARF-2024-0001"
  userId: string;
  
  // Items
  items: OrderItem[];
  
  // Montos
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  
  // Información del cliente
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  
  // Dirección de envío
  shippingAddress: UserAddress;
  shippingMethod: ShippingMethod;
  shippingDetails?: {
    estimatedDeliveryDays?: number;
    trackingNumber?: string;
    courierName?: string;
  };
  
  // Pago
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'confirmed' | 'failed';
  paymentProof?: string; // URL de la imagen del comprobante
  
  // Estado
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: Timestamp;
    note?: string;
  }[];
  
  // Notas
  customerNotes?: string;
  adminNotes?: string;
  
  // Promociones
  appliedPromotions?: {
    code?: string;
    discount: number;
  };
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deliveredAt?: Timestamp;
}

// ============= CONFIGURACIÓN DE ENVÍO =============
export interface ShippingZone {
  id: string;
  name: string;
  districts: string[];
  method: ShippingMethod;
  cost: number;
  estimatedDays: number;
  freeShippingThreshold?: number; // Envío gratis si supera este monto
  isActive: boolean;
  
  // Para pickup points
  isPickupPoint?: boolean;
  pickupAddress?: string;
  pickupSchedule?: string;
}

// ============= NOTIFICACIONES =============
export type NotificationType = 'order_update' | 'promotion' | 'restock' | 'reward_points';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Timestamp;
}

// ============= ANALYTICS =============
export interface ProductView {
  id: string;
  productId: string;
  userId?: string;
  sessionId: string;
  timestamp: Timestamp;
  source?: string; // 'search', 'category', 'featured', etc.
}

export interface CartAbandonment {
  id: string;
  userId?: string;
  sessionId: string;
  items: OrderItem[];
  subtotal: number;
  createdAt: Timestamp;
}
