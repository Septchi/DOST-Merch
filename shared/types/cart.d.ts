export interface Item {
  type: 'item'
  name: string,
  description: string,
  price: number,
  size: string | null,
  image: string,
}

export interface Combo {
  type: 'combo'
  name: string,
  price: number,
  items: Item[];
}

export type Product = Item | Combo

export interface ItemCart {
  type: 'item'
  name: string,
  size: string | null,
  price: number
  image: string,
  quantity: number
}

export interface ComboCart {
  type: 'combo'
  name: string,
  price: number,
  items: ItemCart[]
}

export type CartProduct = ItemCart | ComboCart
