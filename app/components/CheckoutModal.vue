<template>
  <div class="p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
      <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
      Cart ({{ store.count }} items)
    </h2>

    <p v-if="store.count === 0" class="text-lg">Your cart is empty.</p>
    <ul v-else class="space-y-3 mb-4 max-h-64 overflow-y-auto">
      <li v-for="(product, index) in store.items" :key="index" class="flex justify-between text-lg">
        <div v-if="product.type === 'item'">
          <h1 class="font-bold">{{ product.name }}</h1>
          <h1 class="text-sm">Size: {{ product.size }}</h1>
          <div class="flex gap-2">
            <UInput disabled :placeholder="product.quantity" class="max-w-8" />
            <span>x {{ product.price }}</span>
          </div>
        </div>
        <div v-else>
          <span>{{ product.name }}:</span>
          <div class="flex flex-col pl-2">
            <span v-for="item in product.items">{{ item.name }} {{ item.size != null ? `(${item.size})` : '' }}</span>
          </div>
        </div>
        <div>
          <span class="font-semibold">₱{{ product.price * ('quantity' in product ? product.quantity : 1) }}</span>
          <UButton icon="i-lucide-trash-2" @click="store.remove(product)" size="md" color="error" variant="ghost" />
        </div>
      </li>
    </ul>

    <p class="font-bold text-xl text-blue-800">Total: ₱{{ store.total }}</p>
    <div class="flex justify-between">
      <UButton label="Clear" color="primary" variant="soft" class="mt-4 w-auto px-2 justify-center"
        @click="store.clear()" />
      <UButton label="Checkout" color="primary" variant="soft" class="mt-4 w-auto px-2 justify-center"
        @click="router.push('/checkout')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const store = useCartStore()
const router = useRouter()

</script>

<style></style>
