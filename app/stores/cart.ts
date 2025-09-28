import { defineStore } from 'pinia'
import type { Item, Combo, ItemCart, ComboCart, CartProduct, Product } from '@/types/types';

const itemToCart = (item: Item, qty: number): ItemCart => ({ type: 'item', name: item.name, size: item.size, image: item.image, price: item.price, quantity: qty })
const comboToCart = (combo: Combo): ComboCart => ({ type: 'combo', name: combo.name, price: combo.price, items: combo.items.map(item => itemToCart(item, 1)) })


export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartProduct[]
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + 1, 0),
    total: (state) => state.items.reduce((total, item) => total + item.price * (item.type == 'item' ? item.quantity : 1), 0),
  },
  actions: {
    add(product: Product, qty: number = 1) {
      switch (product.type) {
        case "item":
          const itemProduct: ItemCart | undefined = this.items.find((item: CartProduct): item is ItemCart => {
            if (item.type === 'item')
              return item.name === product.name && item.size === product.size;
            return false;
          });
          if (itemProduct)
            itemProduct.quantity += qty;
          else
            this.items.push(itemToCart(product, qty));
          break;

        case "combo":

          this.items.push(comboToCart(product))
          break;
        default:
          console.log("rorrs of e: ", product)
          break;
      }
      this.saveSession();
    },
    clear() {
      this.items = []
      this.saveSession();
    },
    remove(product: Product) {
      console.log("deleting")
      switch (product.type) {
        case "item":
          this.items = this.items.filter((item: CartProduct): boolean => {
            if (item.type == 'item')
              return !(item.name == product.name && item.size === product.size)
            return true
          })
          break;

        case "combo":
          this.items = this.items.filter((combo: CartProduct): boolean => {
            if (combo.type !== 'combo')
              return true
            if (combo.name !== product.name)
              return true
            for (const item of combo.items) {
              const itemMatch = product.items.find((productItem: ItemCart) => {
                return (item.name == productItem.name && item.size === productItem.size);
              });
              if (!itemMatch)
                return true;
            }
            return false
          });
          break;
        default:
          console.log("rorrs of e: ", product)
          break;
      }
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
