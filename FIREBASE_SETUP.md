# 🔥 Estructura de Firebase para Arela E-commerce

## 📚 Colecciones de Firestore

### **1. products** (Productos)
```typescript
{
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  
  // Categorización
  categoryId: string
  categoryName: string
  subcategoryId?: string
  subcategoryName?: string
  brandId: string
  brandName: string
  
  // Variantes
  hasVariants: boolean
  variants: [
    {
      id: string
      name: string // "Rosa Claro", "50ml"
      sku: string
      price: number
      compareAtPrice?: number
      stock: number
      images: string[]
      attributes: { color: "rosa", tamaño: "50ml" }
    }
  ]
  
  // Sin variantes
  basePrice?: number
  compareAtPrice?: number
  baseSku?: string
  baseStock?: number
  
  // Multimedia
  images: string[]
  thumbnail: string
  
  // Beneficios y características
  benefits: string[] // ["Hidratación 24h", "Antiarrugas"]
  ingredients?: string[]
  howToUse?: string
  
  // SEO
  tags: string[]
  metaDescription?: string
  
  // Control
  isActive: boolean
  isFeatured: boolean // Best sellers
  isNew: boolean
  hasPromotion: boolean
  promotionId?: string
  
  // Estadísticas
  viewsCount: number
  salesCount: number
  averageRating?: number
  reviewsCount?: number
  
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**Índices compuestos necesarios:**
- `isActive` + `isFeatured` + `salesCount` (desc)
- `isActive` + `isNew` + `createdAt` (desc)
- `categoryId` + `isActive` + `createdAt` (desc)
- `brandId` + `isActive` + `createdAt` (desc)

---

### **2. categories** (Categorías)
```typescript
{
  id: string
  name: string // "Skincare", "Makeup", "Herramientas"
  slug: string
  description?: string
  image?: string
  parentId?: string // Para subcategorías
  order: number
  isActive: boolean
  productCount: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

### **3. brands** (Marcas)
```typescript
{
  id: string
  name: string
  slug: string
  logo?: string
  isActive: boolean
  productCount: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

### **4. promotions** (Ofertas)
```typescript
{
  id: string
  name: string
  description?: string
  type: 'fixed_price' | 'percentage' | 'buy_x_get_y' | 'promo_code'
  
  // Descuentos
  discountAmount?: number // Precio fijo nuevo
  discountPercentage?: number
  
  // Para 2x1, 3x2
  buyQuantity?: number // Compra 2
  getQuantity?: number // Lleva 3
  
  // Código promocional
  code?: string
  
  // Aplicabilidad
  applicableToAllProducts: boolean
  productIds: string[]
  categoryIds: string[]
  brandIds: string[]
  
  // Vigencia
  startDate: Timestamp
  endDate: Timestamp
  isActive: boolean
  
  // Límites
  usageLimit?: number
  usageCount: number
  perUserLimit?: number
  
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

---

### **5. users** (Usuarios)
```typescript
{
  id: string // Firebase Auth UID
  email: string
  displayName: string
  phone?: string
  photoURL?: string
  
  // Direcciones de envío
  addresses: [
    {
      id: string
      label: string // "Casa", "Oficina"
      fullName: string
      phone: string
      street: string
      reference?: string
      district: string
      city: string
      postalCode?: string
      isDefault: boolean
    }
  ]
  
  // Wishlist
  wishlist: string[] // Array de product IDs
  
  // Sistema de puntos
  rewardPoints: number
  totalSpent: number
  
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLoginAt: Timestamp
}
```

---

### **6. orders** (Pedidos)
```typescript
{
  id: string
  orderNumber: string // "ARF-2024-0001"
  userId: string
  
  // Items del pedido
  items: [
    {
      productId: string
      productName: string
      productSlug: string
      variantId?: string
      variantName?: string
      sku: string
      quantity: number
      unitPrice: number
      totalPrice: number
      thumbnail: string
      promotionApplied?: {
        promotionId: string
        promotionName: string
        discount: number
      }
    }
  ]
  
  // Montos
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  
  // Cliente
  customer: {
    name: string
    email: string
    phone: string
  }
  
  // Envío
  shippingAddress: UserAddress
  shippingMethod: 'olva_courier' | 'motorizado' | 'pickup_surquillo' | 'pickup_lince'
  shippingDetails?: {
    estimatedDeliveryDays?: number
    trackingNumber?: string
    courierName?: string
  }
  
  // Pago
  paymentMethod: 'transferencia' | 'yape' | 'plin'
  paymentStatus: 'pending' | 'confirmed' | 'failed'
  paymentProof?: string // URL de comprobante
  
  // Estado
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  statusHistory: [
    {
      status: 'pending'
      timestamp: Timestamp
      note?: string
    }
  ]
  
  // Notas
  customerNotes?: string
  adminNotes?: string
  
  // Promociones aplicadas
  appliedPromotions?: {
    code?: string
    discount: number
  }
  
  createdAt: Timestamp
  updatedAt: Timestamp
  deliveredAt?: Timestamp
}
```

**Índices compuestos:**
- `userId` + `createdAt` (desc)
- `status` + `createdAt` (desc)

---

### **7. shippingZones** (Zonas de Envío)
```typescript
{
  id: string
  name: string // "Lima - Olva Courier"
  districts: string[]
  method: 'olva_courier' | 'motorizado' | 'pickup_surquillo' | 'pickup_lince'
  cost: number
  estimatedDays: number
  freeShippingThreshold?: number
  isActive: boolean
  
  // Para pickup points
  isPickupPoint?: boolean
  pickupAddress?: string
  pickupSchedule?: string // "Lunes a Viernes hasta las 6 PM"
}
```

---

### **8. notifications** (Notificaciones)
```typescript
{
  id: string
  userId: string
  type: 'order_update' | 'promotion' | 'restock' | 'reward_points'
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: Timestamp
}
```

---

### **9. productViews** (Analytics - Vistas de productos)
```typescript
{
  id: string
  productId: string
  userId?: string
  sessionId: string
  timestamp: Timestamp
  source?: string // 'search', 'category', 'featured'
}
```

---

### **10. cartAbandonments** (Carritos abandonados)
```typescript
{
  id: string
  userId?: string
  sessionId: string
  items: OrderItem[]
  subtotal: number
  createdAt: Timestamp
}
```

---

## 🔐 Reglas de Seguridad de Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // PRODUCTOS - Solo lectura para usuarios
    match /products/{productId} {
      allow read: if resource.data.isActive == true;
      allow write: if false; // Solo por admin desde consola o funciones
    }
    
    // CATEGORÍAS - Solo lectura
    match /categories/{categoryId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }
    
    // MARCAS - Solo lectura
    match /brands/{brandId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }
    
    // PROMOCIONES - Solo lectura de activas
    match /promotions/{promotionId} {
      allow read: if resource.data.isActive == true 
                  && resource.data.startDate <= request.time 
                  && resource.data.endDate >= request.time;
      allow write: if false;
    }
    
    // USUARIOS - Solo el propietario
    match /users/{userId} {
      allow read: if isSignedIn() && isOwner(userId);
      allow create: if isSignedIn() && isOwner(userId);
      allow update: if isSignedIn() && isOwner(userId);
      allow delete: if false;
    }
    
    // PEDIDOS
    match /orders/{orderId} {
      allow read: if isSignedIn() && 
                  (isOwner(resource.data.userId) || request.auth.token.admin == true);
      allow create: if isSignedIn() && isOwner(request.resource.data.userId);
      allow update: if false; // Solo por funciones o admin
      allow delete: if false;
    }
    
    // ZONAS DE ENVÍO - Solo lectura
    match /shippingZones/{zoneId} {
      allow read: if resource.data.isActive == true;
      allow write: if false;
    }
    
    // NOTIFICACIONES - Solo el propietario
    match /notifications/{notificationId} {
      allow read: if isSignedIn() && isOwner(resource.data.userId);
      allow update: if isSignedIn() && isOwner(resource.data.userId);
      allow delete: if isSignedIn() && isOwner(resource.data.userId);
      allow create: if false; // Solo por funciones
    }
    
    // ANALYTICS - Sin acceso directo
    match /productViews/{viewId} {
      allow read, write: if false;
    }
    
    match /cartAbandonments/{abandonmentId} {
      allow read, write: if false;
    }
  }
}
```

---

## 🚀 Datos Iniciales de Ejemplo

### Categorías
```javascript
// Skincare
{
  id: "skincare",
  name: "Skincare",
  slug: "skincare",
  order: 1,
  isActive: true,
  productCount: 0
}

// Makeup
{
  id: "makeup",
  name: "Makeup",
  slug: "makeup",
  order: 2,
  isActive: true,
  productCount: 0
}

// Herramientas
{
  id: "herramientas",
  name: "Herramientas",
  slug: "herramientas",
  order: 3,
  isActive: true,
  productCount: 0
}
```

### Zonas de Envío
```javascript
// Olva Courier (Lima estándar)
{
  id: "olva_lima",
  name: "Olva Courier - Lima",
  districts: ["Todos los distritos de Lima"],
  method: "olva_courier",
  cost: 15,
  estimatedDays: 7,
  isActive: true
}

// Motorizado (3 días)
{
  id: "motorizado",
  name: "Motorizado - Lima",
  districts: ["Lima", "Miraflores", "San Isidro", "Surco", "La Molina", "Barranco", "Chorrillos"],
  method: "motorizado",
  cost: 10,
  estimatedDays: 3,
  freeShippingThreshold: 150,
  isActive: true
}

// Pickup Surquillo
{
  id: "pickup_surquillo",
  name: "Recojo en Surquillo",
  districts: ["Surquillo"],
  method: "pickup_surquillo",
  cost: 0,
  estimatedDays: 0,
  isPickupPoint: true,
  pickupAddress: "Clínica Detecta, Surquillo",
  pickupSchedule: "Lunes a Viernes hasta las 6:00 PM",
  isActive: true
}

// Pickup Lince
{
  id: "pickup_lince",
  name: "Recojo en Lince",
  districts: ["Lince"],
  method: "pickup_lince",
  cost: 0,
  estimatedDays: 0,
  isPickupPoint: true,
  pickupAddress: "Pedro Ruiz Gallo, Lince",
  pickupSchedule: "Lunes a Viernes de 7:00 AM a 9:00 PM",
  isActive: true
}
```

---

## 📦 Instalación y Setup

1. **Instalar Firebase:**
```bash
npm install firebase
```

2. **Inicializar Firebase en tu proyecto:**
Ya está configurado en `src/lib/firebase/config.ts`

3. **Agregar AuthProvider en layout:**
```tsx
import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

4. **Configurar reglas de seguridad:**
- Ve a Firebase Console > Firestore Database > Rules
- Copia y pega las reglas de seguridad de arriba

5. **Crear las colecciones iniciales:**
- Puedes crear las categorías y zonas de envío manualmente desde Firebase Console
- O crear un script de inicialización

---

## 🎯 Uso de los Servicios

### Ejemplo: Crear un producto
```typescript
import { productsService } from '@/lib/firebase/services/products.service';

const newProduct = await productsService.create({
  name: "Crema Hidratante",
  slug: "crema-hidratante",
  description: "Crema hidratante para todo tipo de piel",
  categoryId: "skincare",
  categoryName: "Skincare",
  brandId: "marca1",
  brandName: "Marca 1",
  hasVariants: false,
  variants: [],
  basePrice: 89.90,
  baseStock: 50,
  baseSku: "SKU-001",
  images: ["/products/crema.jpg"],
  thumbnail: "/products/crema-thumb.jpg",
  benefits: ["Hidratación profunda", "Absorción rápida"],
  tags: ["hidratante", "crema", "skincare"],
  isActive: true,
  isFeatured: false,
  isNew: true,
  hasPromotion: false,
});
```

### Ejemplo: Crear un pedido
```typescript
import { ordersService } from '@/lib/firebase/services/orders.service';

const order = await ordersService.create({
  userId: user.uid,
  items: cartItems,
  subtotal: 150,
  shippingCost: 10,
  discount: 0,
  total: 160,
  customer: {
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "987654321"
  },
  shippingAddress: selectedAddress,
  shippingMethod: "motorizado",
  paymentMethod: "yape",
  paymentStatus: "pending",
  status: "pending"
});
```

---

## 🔄 Próximos Pasos

1. ✅ Instalar Firebase SDK
2. ✅ Configurar tipos TypeScript
3. ✅ Crear servicios CRUD
4. ✅ Configurar autenticación
5. ✅ Crear hooks personalizados
6. ⏳ Configurar reglas de seguridad en Firebase Console
7. ⏳ Crear datos iniciales (categorías, zonas de envío)
8. ⏳ Integrar con componentes existentes
9. ⏳ Agregar Firebase Storage para imágenes
10. ⏳ Implementar Cloud Functions para lógica del servidor

---

**Documentación creada para Arela E-commerce** 🛍️
