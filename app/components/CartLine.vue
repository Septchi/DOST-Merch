<template>
  <div class="flex w-full flex-col sm:flex-row gap-4 sm:gap-5">
    <div v-if="product.type == 'item'" class="w-full sm:w-1/6 flex items-center justify-center p-2">
      <NuxtImg :src="product.image" :alt="product.name"
        class="w-full max-w-[150px] sm:max-w-full aspect-square rounded-2xl object-cover" />
    </div>
    <div v-else class="w-full sm:w-1/6 flex items-center justify-center p-2">
      <UCarousel v-slot="{ item }" @select="onSelect" :items="product.items" dots
        class="w-full max-w-[150px] sm:max-w-full rounded-lg">
        <img :src="item.image" :alt="item.name" class="w-full h-32 sm:h-48 object-cover rounded-lg mx-auto" />
      </UCarousel>
    </div>

    <div class="flex flex-col gap-2">
      <h1 class="font-bold text-lg sm:text-xl">{{ product.name }}</h1>
      <div v-if="product.type == 'item'">
        <h1 v-if="product.size" class="text-base sm:text-lg">Size: {{ product.size }}</h1>
      </div>
      <div v-else>
        <h1 v-if="current_item?.size" class="text-base sm:text-lg">Size: {{ current_item?.size ?? 'N/A' }}</h1>
      </div>
      <h1 v-if="product.type == 'item'" class="text-base sm:text-lg">Qty: {{ product.quantity }}</h1>
    </div>

    <div class="ml-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <span class="font-semibold text-xl sm:text-2xl">₱{{ product.price * ('quantity' in product ? product.quantity : 1)
        }}</span>
      <UButton icon="i-lucide-trash-2" @click="store.remove(product)" size="lg" color="error" variant="ghost" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const store = useCartStore();
const props = defineProps<{
  product: CartProduct
}>()

const current_item = ref(null)
function onSelect(index: number) {
  current_item.value = props.product.items[index]
  console.log(current_item.value)
}
</script>


<style scoped></style>
