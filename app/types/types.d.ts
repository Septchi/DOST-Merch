export interface Item {
  name: string,
  description: string,
  price: number,
  size: string | null,
  image: string,
  toCart(): ItemCart;
}

export interface Combo {
  name: string,
  price: number,
  items: Item[];
  toCart(): ComboCart;
}

export interface ItemCart {
  name: string,
  size: string,
  price: number
}

export interface ComboCart {
  name: string,
  price: number,
  items: ItemCart[]
}

export type CartProduct = ItemCart | ComboCart
