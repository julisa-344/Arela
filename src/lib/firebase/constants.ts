// Nombres de las colecciones en Firestore
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  PROMOTIONS: 'promotions',
  USERS: 'users',
  ORDERS: 'orders',
  SHIPPING_ZONES: 'shippingZones',
  NOTIFICATIONS: 'notifications',
  PRODUCT_VIEWS: 'productViews',
  CART_ABANDONMENTS: 'cartAbandonments',
} as const;

// Métodos de pago disponibles
export const PAYMENT_METHODS = {
  TRANSFERENCIA: 'transferencia',
  YAPE: 'yape',
  PLIN: 'plin',
} as const;

// Métodos de envío
export const SHIPPING_METHODS = {
  OLVA_COURIER: 'olva_courier',
  MOTORIZADO: 'motorizado',
  PICKUP_SURQUILLO: 'pickup_surquillo',
  PICKUP_LINCE: 'pickup_lince',
} as const;

// Estados de pedido
export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Estados de pago
export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  FAILED: 'failed',
} as const;

// Tipos de promociones
export const PROMOTION_TYPES = {
  FIXED_PRICE: 'fixed_price',
  PERCENTAGE: 'percentage',
  BUY_X_GET_Y: 'buy_x_get_y',
  PROMO_CODE: 'promo_code',
} as const;

// Información de puntos de recojo
export const PICKUP_POINTS = {
  surquillo: {
    name: 'Surquillo - Clínica Detecta',
    address: 'Clínica Detecta, Surquillo',
    schedule: 'Lunes a Viernes hasta las 6:00 PM',
    district: 'Surquillo',
  },
  lince: {
    name: 'Lince - Pedro Ruiz Gallo',
    address: 'Pedro Ruiz Gallo, Lince',
    schedule: 'Lunes a Viernes de 7:00 AM a 9:00 PM',
    district: 'Lince',
  },
} as const;
