# 🔥 Configuración Firebase - Pasos Finales

## ✅ Lo que ya está hecho:

1. ✅ Firebase instalado
2. ✅ Tipos TypeScript definidos
3. ✅ Servicios CRUD creados
4. ✅ AuthProvider integrado en el layout
5. ✅ Hero rediseñado con estilo editorial
6. ✅ Modal de autenticación creado
7. ✅ Header actualizado con login/perfil

## 🚀 Pasos que debes completar:

### 1. Configurar Firebase Console

#### a) Activar Authentication:
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto "materialize-blog-5ad8a"
3. Ve a **Authentication** → **Get Started**
4. Habilita los siguientes proveedores:
   - **Google**: Click en Google → Enable → Guarda
   - **Email/Password**: Click en Email/Password → Enable → Guarda

#### b) Configurar Firestore Rules:
1. Ve a **Firestore Database** → **Rules**
2. Copia y pega las reglas del archivo `FIREBASE_SETUP.md`
3. Click en **Publish**

#### c) Activar Firebase Storage:
1. Ve a **Storage** → **Get Started**
2. Usa las reglas de producción
3. Click en **Done**

### 2. Poblar datos iniciales:

```bash
# Instalar tsx para ejecutar TypeScript
npm install -D tsx

# Ejecutar script de población
npx tsx scripts/seed-firebase.ts
```

Esto creará:
- ✅ 3 Categorías (Skincare, Makeup, Herramientas)
- ✅ 5 Marcas de ejemplo
- ✅ 4 Zonas de envío (Olva, Motorizado, Pickups)
- ✅ 3 Productos de ejemplo

### 3. Subir imágenes de productos:

Necesitas subir imágenes a Firebase Storage y actualizar las URLs en los productos.

**Opción A: Desde Firebase Console**
1. Ve a **Storage** en Firebase Console
2. Crea carpeta `products/`
3. Sube las imágenes de tus productos
4. Copia las URLs públicas
5. Actualiza los productos en Firestore con esas URLs

**Opción B: Programáticamente**
```typescript
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Código para subir imagen
const storage = getStorage();
const imageRef = ref(storage, 'products/imagen.jpg');
await uploadBytes(imageRef, file);
const url = await getDownloadURL(imageRef);
```

### 4. Probar la aplicación:

```bash
npm run dev
```

Ahora puedes:
- ✅ Ver el nuevo Hero editorial
- ✅ Hacer login con Google
- ✅ Registrarte con email/password
- ✅ Ver productos (una vez que agregues imágenes reales)

### 5. Índices compuestos de Firestore:

Cuando ejecutes queries, Firestore te dará enlaces para crear índices automáticamente. Solo haz click en esos enlaces cuando aparezcan en la consola.

## 📱 Usar la autenticación en tus componentes:

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';

export function MiComponente() {
  const { user, userData, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <div>Debes iniciar sesión</div>;
  }

  return (
    <div>
      <p>Hola, {user.displayName}</p>
      <p>Puntos: {userData?.rewardPoints}</p>
    </div>
  );
}
```

## 🛍️ Crear un pedido:

```tsx
import { ordersService } from '@/lib/firebase/services/orders.service';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';

const { items, total, clearCart } = useCart();
const { user } = useAuth();

const order = await ordersService.create({
  userId: user.uid,
  items: items.map(item => ({
    productId: item.id,
    productName: item.name,
    productSlug: item.slug,
    sku: item.sku,
    quantity: item.quantity,
    unitPrice: item.price,
    totalPrice: item.price * item.quantity,
    thumbnail: item.image,
  })),
  subtotal: total,
  shippingCost: 10,
  discount: 0,
  total: total + 10,
  customer: {
    name: user.displayName,
    email: user.email,
    phone: '987654321',
  },
  shippingAddress: selectedAddress,
  shippingMethod: 'motorizado',
  paymentMethod: 'yape',
  paymentStatus: 'pending',
  status: 'pending',
});

clearCart();
// Redirigir a página de confirmación
```

## 🎨 Personalización del Hero:

Si quieres ajustar el hero, edita: `src/components/sections/home/Hero.tsx`

Puedes cambiar:
- Colores de overlay
- Tamaño de texto
- Espaciado
- Animaciones
- Botones

## 📊 Analytics:

Google Analytics ya está configurado. Para trackear eventos personalizados:

```typescript
import { analytics } from '@/lib/firebase/config';
import { logEvent } from 'firebase/analytics';

// Trackear vista de producto
if (analytics) {
  logEvent(analytics, 'view_item', {
    item_id: product.id,
    item_name: product.name,
  });
}
```

## 🔐 Seguridad:

- ✅ Las reglas de Firestore protegen tus datos
- ✅ Los usuarios solo pueden ver sus propios pedidos
- ✅ Los productos son read-only para usuarios
- ✅ Solo tú puedes modificar productos desde Firebase Console

## 📝 Próximos pasos sugeridos:

1. ⏳ Crear página de cuenta de usuario (`/cuenta`)
2. ⏳ Página de historial de pedidos
3. ⏳ Sistema de checkout completo
4. ⏳ Integración con WhatsApp para confirmar pedidos
5. ⏳ Panel de administración (para gestionar productos/pedidos)
6. ⏳ Notificaciones por email con Firebase Functions
7. ⏳ Sistema de reseñas de productos
8. ⏳ Búsqueda avanzada con Algolia o Typesense

## 🆘 Ayuda:

- Documentación completa: `FIREBASE_SETUP.md`
- Estructura de BD: Ver tipos en `src/shared/types/firebase.ts`
- Servicios disponibles: `src/lib/firebase/services/`

---

**¡Tu e-commerce Arela está listo para despegar! 🚀**
