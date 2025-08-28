<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import { defineStore } from 'pinia'

type cartItem = {
  name: string,
  price: number,
  quantity: number
}
export const useCartStore = defineStore('cart', {
  state: ()=> ({
    items: [] as {name: string, price: number, quantity: number}[]
  }),
  actions: {
    add(item: cartItem) {
      const exist = this.items.find(i=>i.name === item.name);
      if(exist) exist.quantity++;
      else this.items.push(item);
    },
    clear(){
      this.items = []
    }
  }
})
onMounted(async () => {
})
</script>
