import { defineStore } from 'pinia'

interface Item {
  name: string,
  size: string,
  price: number,
}

interface Item {
  name: string,
  size: string,
  price: number,
}

interface cartItem {
  name: string,
  price: number,
  quantity: number
};
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as cartItem[]
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    total: (state) => state.items.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    add(item: Item) {
      const exist = this.items.find(i => i.name === item.name);
      if (exist) exist.quantity++;
      else this.items.push({ name: item.name, price: item.price, quantity: 1 });
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
