<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <header class="text-center py-6">
      <h1 class="text-3xl font-bold " color="primary">DOST SA NegOr Pre-Order</h1>
      <p class="mt-2">Shop our exclusive combos and individual items! Pre-order now.</p>
    </header>

    <!-- Cart Summary Button and Modal -->
    <div class="sticky top-4 flex justify-end">
      <UButton icon="i-heroicons-shopping-cart" size="lg" color="primary" variant="solid"
        class="shadow-lg px-6 py-3 text-lg" @click="showCartModal = true">
        Cart ({{ store.count }})
      </UButton>
    </div>
    <UModal v-model:open="showCartModal">
      <template #content>
        <div class="p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
            Cart ({{ store.count }} items)
          </h2>

          <p v-if="store.count === 0" class="text-lg">Your cart is empty.</p>
          <ul v-else class="space-y-3 mb-4 max-h-64 overflow-y-auto">
            <li v-for="(item, index) in store.items" :key="index" class="flex justify-between text-lg">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span class="font-semibold">₱{{ item.price * item.quantity }}</span>
            </li>
          </ul>

          <p class="font-bold text-xl text-blue-800">Total: ₱{{ store.total }}</p>
          <div class="flex justify-between">
          <UButton label="Clear" color="primary" variant="soft" class="mt-4 w-auto px-2 justify-center" @click="store.clear()"/>
          <UButton label="Checkout" color="primary" variant="soft" class="mt-4 w-auto px-2 justify-center" @click="router.push('/checkout')"/>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Individual Items Section -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Individual Items</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in items" :key="item.name" class="p-4 rounded-lg shadow hover:shadow-lg transition">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover rounded mb-4">
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ item.price }}</p>
          <div v-if="item.name != 'Lanyard'">
          <h4 class="text-lg font-semibold">Size</h4>
          <div  class="flex gap-2">
            <UButton v-for="size in sizes" :label="size" :variant="getCurrentButton(item.size, size)" @click="setButtonSize(item.name, size)" class="rounded-lg"></UButton>
          </div>
          </div>
          <button @click="store.add(item)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add
            to Cart</button>
        </div>
      </div>
    </section>

    <!-- Combos Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Combos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="combo in combos" :key="combo.name" class="p-4 rounded-lg shadow hover:shadow-lg transition">
          <div class="flex justify-center gap-2 mb-4">
            <UCarousel v-slot="{ item }" :items="combo.images" dots class="w-full mb-4 rounded-lg">
              <img :src="item" class="h-48 object-cover rounded-lg" alt="Carousel image" />
            </UCarousel>
          </div>
          <h3 class="text-lg font-semibold">{{ combo.name }}</h3>
          <p>{{ combo.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ combo.price }}</p>
          <button @click="store.add(combo)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add
            to Cart</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang='ts'>
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useCartStore()
const showCartModal = ref(false)

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const combos = [
  {
    name: 'Combo 1: Shirt + Lanyard',
    description: 'Cotton Shirt and Lanyard bundle',
    price: 420,
    size: 'XS',
    images: ['/images/cotton_shirt.jpg', '/images/lanyard.jpg']
  },
  {
    name: 'Combo 2: Polo + Lanyard',
    description: 'Cotton Polo Shirt and Lanyard bundle',
    price: 620,
    size: 'XS',
    images: ['/images/cotton_polo.jpg', '/images/lanyard.jpg']
  },
  {
    name: 'Combo 3: Polo + Shirt',
    description: 'Cotton Polo Shirt and Cotton Shirt bundle',
    price: 850,
    size: 'XS',
    images: ['/images/cotton_polo.jpg', '/images/cotton_shirt.jpg']
  },
  {
    name: 'Combo 4: Polo + Shirt + Lanyard',
    description: 'Complete bundle with Polo, Shirt, and Lanyard',
    price: 900,
    size: ['XS', 'XS'],
    images: ['/images/cotton_polo.jpg', '/images/cotton_shirt.jpg', '/images/lanyard.jpg']
  }
]

const items = ref([
  {
    name: 'Cotton Polo Shirt',
    description: 'Comfortable cotton polo shirt',
    price: 550,
    size: 'XS',
    image: '/images/cotton_polo.jpg'
  },
  {
    name: 'Cotton Shirt',
    description: 'Lightweight cotton shirt',
    price: 350,
    size: 'XS',
    image: '/images/cotton_shirt.jpg'
  },
  {
    name: 'Lanyard',
    description: 'Durable lanyard for everyday use',
    price: 120,
    size: 'XS',
    image: '/images/lanyard.jpg'
  },
  {
    name: 'Sublimation Jersey',
    description: 'Vibrant sublimation jersey',
    price: 350,
    size: 'XS',
    image: '/images/sublimation_shirt.png'
  }
])

function getCurrentButton(size: string, button: string){
  return button === size ? 'subtle' : 'ghost';
}

function setButtonSize(name: string, size: string){
  const item = items.value.find(item => item.name === name);
  if(item)
    item.size = size;
}

onMounted(() => {
  store.loadSession();
})
</script>
