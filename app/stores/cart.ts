import { defineStore } from 'pinia'
import type { Item, Combo, ItemCart, ComboCart, CartProduct } from '@/types/types';

const itemToCart = (item: Item): ItemCart => ({type: 'item', name: item.name, size: item.size, price: item.price} )
const comboToCart = (combo: Combo): ComboCart => ({type: 'combo', name: combo.name, price: combo.price, items: combo.items.map(item => itemToCart(item))})


export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartProduct[]
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + 1, 0),
    total: (state) => state.items.reduce((total, item) => total + item.price, 0),
  },
  actions: {
    add(product: Product) {
      if(product.type === 'item')
        this.items.push(itemToCart(product))
      if(product.type === 'combo')
        this.items.push(comboToCart(product))
      else
        console.log("rorrs of e: ", product)
      console.log(this.items[this.items.length - 1])
      this.saveSession();
    },
    clear() {
      this.items = []
      this.saveSession();
    },
    saveSession() {
      sessionStorage.setItem('cart', JSON.stringify(this.items));
    },
    loadSession() {
      const data = sessionStorage.getItem('cart');
      if (data)
        this.items = JSON.parse(data);
    },
  }
})
