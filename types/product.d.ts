export class Item {
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

export interface Combo {
  name: string,
  price: number,
  items: Item[];
}

