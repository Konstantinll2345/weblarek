import { IProduct } from "../../types";

export class Cart {

  private items: IProduct[] = [];

  getItems(): IProduct[] {
      return [...this.items];
    }

  addItem(product: IProduct): void {
    this.items.push(product)
  }
  
  deleteItem(item: IProduct): void {
    const deleteItem = item;
    this.items = this.items.filter(item => item.id !== deleteItem.id);
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