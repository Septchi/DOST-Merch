<template>
  <div class="p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
      <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
      Cart ({{ store.count }} items)
    </h2>

    <p v-if="store.count === 0" class="text-lg">Your cart is empty.</p>
    <ul v-else class="space-y-3 mb-4 max-h-64 overflow-y-auto">
      <li v-for="(product, index) in store.items" :key="index" class="flex justify-between text-lg">
        <span v-if="product.type === 'item'">{{ product.name }} {{product.size != null ? `(${product.size})` : ''}}</span>
        <div v-else>
          <span>{{product.name}}:</span>
          <div class="flex flex-col pl-2">
            <span v-for="item in product.items">{{item.name}} {{item.size != null ? `(${item.size})` : ''}}</span>
          </div>
        </div>
        <span class="font-semibold">₱{{product.price }}</span>
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

<script setup lang=ts>
  import { useCartStore } from '@/stores/cart';
  const store = useCartStore()
</script>

<style>
</style>
