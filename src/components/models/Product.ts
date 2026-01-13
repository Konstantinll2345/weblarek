import { EventEmitter } from '../base/Events';
import { IProduct } from '../../types';

export class Products {
  private items: IProduct[] = [];
  private previewItem: IProduct | null = null;
    
  constructor(private events?: EventEmitter) {
  }

  setItems(items: IProduct[]): void {
    this.items = items;
    if (this.events) {
      this.events.emit('products:changed', { items: this.items });
    }
  }

  getItems(): IProduct[] {
    return [...this.items];
  }
    
  getItem(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreviewItem(item: IProduct | null): void {
    this.previewItem = item;
    if (this.events) {
        this.events.emit('preview:changed', { item: this.previewItem });
    }
}

  getPreviewItem(): IProduct | null {
    return this.previewItem;
  }
}