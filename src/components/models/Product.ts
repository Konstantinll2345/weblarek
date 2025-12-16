import { IProduct } from "../../types";

export class Products {
  private items: IProduct[] = [];
  private previewItem: IProduct | null = null;

  constructor() {
  }

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return [...this.items];
  }
    
  getItem(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreviewItem(item: IProduct): void {
    this.previewItem = item;
  }

  getPreviewItem(): IProduct | null {
    return this.previewItem;
  }
}