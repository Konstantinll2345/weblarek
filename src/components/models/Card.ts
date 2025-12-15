import { IProduct } from "../../types";

export class Card {

  private items: IProduct[] = [];

  getItems(): IProduct[] {
      return JSON.parse(JSON.stringify(this.items));
    }

  addItem(product: IProduct) :void {
    this.items.push(product)
  }
  
  deleteItem(productId: string): boolean {
    const initialLength = this.items.length;   
    this.items = this.items.filter(item => item.id !== productId);      
    return this.items.length < initialLength;
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasItem(productId: string): boolean {
    return this.items.some(item => item.id === productId);
  }
}