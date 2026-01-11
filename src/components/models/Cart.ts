import { EventEmitter } from '../base/Events';
import { IProduct } from '../../types';

export class Cart {
  private items: IProduct[] = [];
    
  constructor(private events?: EventEmitter) {

  }

  addItem(product: IProduct): void {
    this.items.push(product);
    if (this.events) {
      this.events.emit('cart:changed', { 
        items: this.items, 
        total: this.getTotalPrice(),
        count: this.items.length 
      });
    }
  }
    
  deleteItem(product: IProduct): void {
    this.items = this.items.filter(item => item.id !== product.id);
    if (this.events) {
      this.events.emit('cart:changed', { 
        items: this.items, 
        total: this.getTotalPrice(),
        count: this.items.length 
      });
    }
  }

  clear(): void {
    this.items = [];
    if (this.events) {
      this.events.emit('cart:changed', { 
        items: [], 
        total: 0,
        count: 0 
      });
    }
  }

  getItems(): IProduct[] {
    return [...this.items];
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