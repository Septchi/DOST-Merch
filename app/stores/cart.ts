import { defineStore } from 'pinia'

class Item {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public size: string | null,
    public image: string,
  ) { }

  setSize(size: string) {
    console.log("hello");
    this.size = size;
  }
}

interface Combo {
  name: string,
  price: number,
  items: Item[];
}

interface Item {
  name: string,
  size: string,
  price: number,
}

interface ComboItem {
  name: string,
  price: number,
  items: Items[]
}

type  cartProduct = Item | ComboItem

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as cartProduct[]
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + 1, 0),
    total: (state) => state.items.reduce((total, item) => total + item.price, 0),
  },
  actions: {
    add(item: cartProduct) {
      console.log("hello");
      this.items.push({...item});
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
