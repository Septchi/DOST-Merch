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

    <!-- Modal things -->
    <UModal v-model:open="showCartModal">
      <template #content>
        <CheckoutModal />
      </template>
    </UModal>

    <UModal v-model:open="showItemModal" :title="currentItem?.name ?? 'NULL'" :ui="{ content: 'max-w-4xl w-5/7' }">
      <template #body>
        <ItemModal :product="currentItem" @cart="nextTick(() => showItemModal = false, 0);" />
      </template>
    </UModal>

    <!-- Individual Items Section -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Individual Items</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="item in items" :key="item.name" @click="showItemModal = true; currentItem = item;"
          class="w-full p-4 rounded-lg shadow hover:shadow-lg transition bg-white">
          <img :src="item.image" :alt="item.name" class="w-full h-48 object-cover rounded mb-4" />
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ item.price }}</p>
        </div>
      </div>
    </section>

    <!-- Combos Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Combos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div @click="showItemModal = true; currentItem = combo" v-for="combo in combos" :key="combo.name"
          class="p-4 rounded-lg shadow hover:shadow-lg transition">
          <div class="flex justify-center gap-2 mb-4">
            <UCarousel v-slot="{ item }" :items="combo.items" dots class="w-full mb-4 rounded-lg">
              <img :src="item.image" class="h-48 object-cover rounded-lg" alt="Carousel image" />
            </UCarousel>
          </div>
          <h3 class="text-lg font-semibold">{{ combo.name }}</h3>
          <p>{{ combo.description }}</p>
          <p class="text-xl font-bold mt-2">₱{{ combo.price }}</p>
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
const showItemModal = ref(false)
const currentItem: Ref<Product | null> = ref(null)

const sizes = ['XS', 'S', 'M', 'L', 'XL'];


const createItem = (item: Omit<Item, 'type'>) => ({ ...item, type: "item" })
const createCombo = (item: Omit<Combo, 'type'>) => ({ ...item, type: "combo" })

const items: Ref<Item[]> = ref([
  createItem({
    name: 'Cotton Polo Shirt',
    description: 'Comfortable cotton polo shirt',
    price: 550,
    size: 'XS',
    image: '/images/cotton_polo.jpg'
  }),
  createItem({
    name: 'Cotton Shirt',
    description: 'Lightweight cotton shirt',
    price: 350,
    size: 'XS',
    image: '/images/cotton_shirt.jpg'
  }),
  createItem({
    name: 'Lanyard',
    description: 'Durable lanyard for everyday use',
    price: 120,
    size: null,
    image: '/images/lanyard.jpg'
  }),
  createItem({
    name: 'Sublimation Jersey',
    description: 'Vibrant sublimation jersey',
    price: 350,
    size: 'XS',
    image: '/images/sublimation_shirt.png'
  })
])
const combos: Ref<Combo[]> = ref([
  createCombo({
    name: 'Combo 1: Shirt + Lanyard',
    price: 420,
    items: [{ ...items.value[1] }, { ...items.value[2] }]
  }),
  createCombo({
    name: 'Combo 2: Polo + Lanyard',
    price: 620,
    items: [{ ...items.value[0] }, { ...items.value[2] }]
  }),
  createCombo({
    name: 'Combo 3: Polo + Shirt',
    price: 850,
    items: [{ ...items.value[0] }, { ...items.value[1] }]
  }),
  createCombo({
    name: 'Combo 4: Polo + Shirt + Lanyard',
    price: 900,
    items: [{ ...items.value[0] }, { ...items.value[1] }, { ...items.value[2] }]
  })
])


function getCurrentButton(size: string, button: string) {
  return button === size ? 'subtle' : 'ghost';
}

function setButtonSize(name: string, size: string) {
  const item = items.value.find(item => item.name === name);
  if (item)
    item.size = size;
}

function setComboButtonSize(name: string, index: number, size: string) {
  const item = combos.value.find(item => item.name === name);
  if (item)
    item.size[index] = size;
}

onMounted(() => {
  store.loadSession();
})
</script>
