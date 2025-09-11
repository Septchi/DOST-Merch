import { defineStore } from 'pinia'
import type { Item, Combo, ItemCart, ComboCart, CartProduct } from '@/types/types';


const itemToCart = (item: Item) => {name: Item.name, size: Item.size, price: Item.price} 
const ComboToCart = (combo: Combo) => {name: combo.name, price: combo.price, items: combo.items} 
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartProduct[]
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + 1, 0),
    total: (state) => state.items.reduce((total, item) => total + item.price, 0),
  },
  actions: {
    add(item: Item | Combo) {
      let product;
      if(typeof item === 'Item')
        product = itemToCart(item)
      if(typeof item === 'Combo')
        product = comboToCart(item)
      this.items.push({ ...item });
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
      const data = sessionStorage.getItem('cart', JSON.stringify(this.items));
      if (data)
        this.items = JSON.parse(data);
    },
  }
})
