import { IProduct, ApiData, ApiDataProm, ApiDataOrder, IOrder } from "../../types/index";

export class ProductApiData {
  constructor(private api: ApiDataProm) {}

  async getProduct(): Promise<IProduct[]> {
    try {
      const response = await this.api.get<ApiData>('/product/');
      return response.items || [];
    }catch (error) {
      console.error('Ошибка при получении товаров:', error);
      return [];
      }
  }

  async submitOrder(orderData: IOrder): Promise<ApiDataOrder> {
    try {
      return await this.api.post<ApiDataOrder>('/order/', orderData);
    }catch (error) {
      console.error('Ошибка при создании заказа:', error);
      throw error;
    }
  }
}