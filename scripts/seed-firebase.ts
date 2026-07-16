/**
 * Script para poblar datos iniciales en Firebase
 * Requiere scripts/serviceAccountKey.json (Firebase Console > Configuración
 * del proyecto > Cuentas de servicio > Generar nueva clave privada)
 * Ejecutar: npx tsx scripts/seed-firebase.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };

initializeApp({
  credential: cert(serviceAccount as any),
});
const db = getFirestore();

async function seedCategories() {
  console.log('🌱 Creando categorías...');
  
  const categories = [
    {
      id: 'skincare',
      name: 'Skincare',
      slug: 'skincare',
      description: 'Cuidado facial para todo tipo de piel',
      order: 1,
      isActive: true,
      productCount: 0,
    },
    {
      id: 'makeup',
      name: 'Makeup',
      slug: 'makeup',
      description: 'Maquillaje natural y de larga duración',
      order: 2,
      isActive: true,
      productCount: 0,
    },
    {
      id: 'herramientas',
      name: 'Herramientas',
      slug: 'herramientas',
      description: 'Brochas, cepillos y accesorios de belleza',
      order: 3,
      isActive: true,
      productCount: 0,
    },
  ];

  for (const category of categories) {
    await db.collection('categories').doc(category.id).set({
      ...category,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`✅ Categoría creada: ${category.name}`);
  }
}

async function seedBrands() {
  console.log('\n🌱 Creando marcas...');
  
  const brands = [
    { id: 'marca-1', name: 'Natur Perú', slug: 'natur-peru' },
    { id: 'marca-2', name: 'Andina Beauty', slug: 'andina-beauty' },
    { id: 'marca-3', name: 'Lima Cosmetics', slug: 'lima-cosmetics' },
    { id: 'marca-4', name: 'Amazonia', slug: 'amazonia' },
    { id: 'marca-5', name: 'Cusco Natural', slug: 'cusco-natural' },
  ];

  for (const brand of brands) {
    await db.collection('brands').doc(brand.id).set({
      ...brand,
      isActive: true,
      productCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`✅ Marca creada: ${brand.name}`);
  }
}

async function seedShippingZones() {
  console.log('\n🌱 Creando zonas de envío...');
  
  const zones = [
    {
      id: 'olva_lima',
      name: 'Olva Courier - Lima',
      districts: ['Todos los distritos de Lima'],
      method: 'olva_courier',
      cost: 15,
      estimatedDays: 7,
      isActive: true,
      isPickupPoint: false,
    },
    {
      id: 'motorizado',
      name: 'Motorizado - Lima',
      districts: ['Lima', 'Miraflores', 'San Isidro', 'Surco', 'La Molina', 'Barranco', 'Chorrillos', 'San Borja'],
      method: 'motorizado',
      cost: 10,
      estimatedDays: 3,
      freeShippingThreshold: 150,
      isActive: true,
      isPickupPoint: false,
    },
    {
      id: 'pickup_surquillo',
      name: 'Recojo en Surquillo',
      districts: ['Surquillo'],
      method: 'pickup_surquillo',
      cost: 0,
      estimatedDays: 0,
      isActive: true,
      isPickupPoint: true,
      pickupAddress: 'Clínica Detecta, Surquillo',
      pickupSchedule: 'Lunes a Viernes hasta las 6:00 PM',
    },
    {
      id: 'pickup_lince',
      name: 'Recojo en Lince',
      districts: ['Lince'],
      method: 'pickup_lince',
      cost: 0,
      estimatedDays: 0,
      isActive: true,
      isPickupPoint: true,
      pickupAddress: 'Pedro Ruiz Gallo, Lince',
      pickupSchedule: 'Lunes a Viernes de 7:00 AM a 9:00 PM',
    },
  ];

  for (const zone of zones) {
    await db.collection('shippingZones').doc(zone.id).set(zone);
    console.log(`✅ Zona de envío creada: ${zone.name}`);
  }
}

async function seedExampleProducts() {
  console.log('\n🌱 Creando productos de ejemplo...');
  
  const products = [
    {
      id: 'crema-hidratante-acido-hialuronico',
      name: 'Crema Hidratante con Ácido Hialurónico',
      slug: 'crema-hidratante-acido-hialuronico',
      description: 'Crema facial ultra hidratante con ácido hialurónico de bajo peso molecular para una absorción profunda. Perfecta para todo tipo de piel.',
      shortDescription: 'Hidratación profunda 24h con ácido hialurónico',
      categoryId: 'skincare',
      categoryName: 'Skincare',
      brandId: 'marca-1',
      brandName: 'Natur Perú',
      hasVariants: true,
      variants: [
        {
          id: 'var-1',
          name: '50ml',
          sku: 'CRH-50',
          price: 89.90,
          stock: 25,
          images: ['/products/crema-50ml.jpg'],
          attributes: { tamaño: '50ml' },
        },
        {
          id: 'var-2',
          name: '100ml',
          sku: 'CRH-100',
          price: 149.90,
          compareAtPrice: 179.80,
          stock: 15,
          images: ['/products/crema-100ml.jpg'],
          attributes: { tamaño: '100ml' },
        },
      ],
      images: ['/products/crema-1.jpg', '/products/crema-2.jpg'],
      thumbnail: '/products/crema-thumb.jpg',
      benefits: [
        'Hidratación profunda por 24 horas',
        'Reduce líneas de expresión',
        'Textura ligera de rápida absorción',
        'Ingredientes naturales 95%',
      ],
      ingredients: ['Ácido Hialurónico', 'Aloe Vera', 'Aceite de Sacha Inchi', 'Vitamina E'],
      howToUse: 'Aplicar por la mañana y noche sobre rostro limpio. Masajear suavemente hasta completa absorción.',
      tags: ['hidratante', 'crema', 'acido-hialuronico', 'skincare', 'antiedad'],
      isActive: true,
      isFeatured: true,
      isNew: true,
      hasPromotion: false,
      viewsCount: 0,
      salesCount: 0,
    },
    {
      id: 'serum-vitamina-c',
      name: 'Sérum Iluminador Vitamina C',
      slug: 'serum-vitamina-c',
      description: 'Sérum concentrado con vitamina C pura que ilumina, unifica el tono y protege contra los radicales libres.',
      shortDescription: 'Ilumina y unifica el tono de tu piel',
      categoryId: 'skincare',
      categoryName: 'Skincare',
      brandId: 'marca-2',
      brandName: 'Andina Beauty',
      hasVariants: false,
      variants: [],
      basePrice: 119.90,
      baseStock: 30,
      baseSku: 'SER-VITC-30',
      images: ['/products/serum-1.jpg', '/products/serum-2.jpg'],
      thumbnail: '/products/serum-thumb.jpg',
      benefits: [
        'Ilumina la piel opaca',
        'Reduce manchas oscuras',
        'Potente antioxidante',
        'Textura no grasa',
      ],
      ingredients: ['Vitamina C 20%', 'Ácido Ferúlico', 'Vitamina E', 'Extracto de Camu Camu'],
      howToUse: 'Aplicar 3-4 gotas en rostro limpio por las mañanas antes de la crema hidratante.',
      tags: ['serum', 'vitamina-c', 'iluminador', 'antimanchas', 'skincare'],
      isActive: true,
      isFeatured: true,
      isNew: false,
      hasPromotion: false,
      viewsCount: 0,
      salesCount: 0,
    },
    {
      id: 'kit-brochas-profesional',
      name: 'Kit de Brochas Profesional 12 piezas',
      slug: 'kit-brochas-profesional',
      description: 'Set completo de 12 brochas profesionales para maquillaje con cerdas sintéticas de alta calidad y estuche incluido.',
      shortDescription: 'Kit profesional de 12 brochas premium',
      categoryId: 'herramientas',
      categoryName: 'Herramientas',
      brandId: 'marca-3',
      brandName: 'Lima Cosmetics',
      hasVariants: true,
      variants: [
        {
          id: 'var-rosa',
          name: 'Rosa Gold',
          sku: 'BRO-12-ROSA',
          price: 159.90,
          stock: 12,
          images: ['/products/brochas-rosa.jpg'],
          attributes: { color: 'rosa-gold' },
        },
        {
          id: 'var-negro',
          name: 'Negro Mate',
          sku: 'BRO-12-NEGRO',
          price: 159.90,
          stock: 18,
          images: ['/products/brochas-negro.jpg'],
          attributes: { color: 'negro-mate' },
        },
      ],
      images: ['/products/brochas-1.jpg', '/products/brochas-2.jpg'],
      thumbnail: '/products/brochas-thumb.jpg',
      benefits: [
        'Cerdas sintéticas ultra suaves',
        'Mangos ergonómicos',
        'Estuche de viaje incluido',
        'Fácil limpieza',
      ],
      tags: ['brochas', 'herramientas', 'maquillaje', 'profesional', 'kit'],
      isActive: true,
      isFeatured: true,
      isNew: false,
      hasPromotion: false,
      viewsCount: 0,
      salesCount: 0,
    },
  ];

  for (const product of products) {
    await db.collection('products').doc(product.id).set({
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log(`✅ Producto creado: ${product.name}`);
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando población de datos en Firebase...\n');
    
    await seedCategories();
    await seedBrands();
    await seedShippingZones();
    await seedExampleProducts();
    
    console.log('\n✨ ¡Datos iniciales creados exitosamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Configurar reglas de seguridad en Firebase Console');
    console.log('2. Activar Authentication (Google + Email/Password)');
    console.log('3. Subir imágenes de productos a Firebase Storage');
    console.log('4. Actualizar URLs de imágenes en los productos\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar datos:', error);
    process.exit(1);
  }
}

main();
