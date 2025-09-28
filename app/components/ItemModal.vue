<template>
  <div v-if="product.type === 'item'" class="flex flex-col sm:flex-row gap-4 sm:gap-8 min-h-[70vh] items-stretch">
    <div class="w-full sm:w-1/2">
      <NuxtImg :src="product.image" :alt="product.name" class="w-full aspect-square object-cover rounded" />
    </div>
    <div class="flex flex-col gap-5 w-full sm:w-1/2">
      <h1 class="font-bold text-2xl">₱{{ product.price }}</h1>
      <h2 class="text-lg">{{ product.description }}</h2>
      <div v-if="product.size != null">
        <h2 class="font-bold">Size:</h2>
        <div class="flex gap-2">
          <UButton v-for="size in sizes" :key="size" :label="size" :variant="product.size === size ? 'subtle' : 'ghost'"
            @click="product.size = size" class="rounded-lg" />
        </div>
      </div>
      <h2 class="font-bold">Quantity:</h2>
      <UInputNumber v-model="qty" :min="1" class="w-24" />
      <UButton @click="store.add(product, qty); $emit('cart')"
        class="mt-auto bg-blue-600 text-white justify-center w-full rounded-lg hover:bg-blue-700" label="Add to Cart" />
    </div>
  </div>
  <div v-else class="flex flex-col sm:flex-row gap-4 sm:gap-8 min-h-[70vh] items-stretch">
    <div class="w-full sm:w-1/2 flex justify-center">
      <div class="pb-10 w-full sm:h-4/5">
        <UCarousel v-slot="{ item }" :items="product.items" dots class="w-full rounded-lg">
          <img :src="item.image" :alt="item.name" class="mx-auto w-full h-48 sm:h-64 object-cover rounded-lg" />
        </UCarousel>
      </div>
    </div>
    <div class="flex flex-col gap-5 w-full sm:w-1/2">
      <h1 class="font-bold text-2xl">₱{{ product.price }}</h1>
      <h2 class="text-lg">{{ product.description }}</h2>
      <div v-for="item in product.items" :key="item.name">
        <h1 class="text-lg font-semibold">{{ item.name }}</h1>
        <div v-if="item.size != null">
          <h2 class="font-bold">Size:</h2>
          <div class="flex gap-2">
            <UButton v-for="size in sizes" :key="size" :label="size" :variant="item.size === size ? 'subtle' : 'ghost'"
              @click="item.size = size" class="rounded-lg" />
          </div>
        </div>
      </div>
      <h2 class="font-bold">Quantity:</h2>
      <UInputNumber v-model="qty" :min="1" class="w-24" />
      <UButton @click="store.add(product, qty); $emit('cart')"
        class="mt-auto bg-blue-600 text-white justify-center w-full rounded-lg hover:bg-blue-700" label="Add to Cart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const store = useCartStore()

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'cart'): void
}>()

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const currSize = ref('XS');
const qty = ref<number>(1)
watch(() => props.product, () => qty.value = 1)

</script>

<style></style>
