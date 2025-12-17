export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'online' | 'offline' | "";

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type BuyerValid = {
  isValid: boolean;
  errors: Partial<Record<keyof IBuyer, string>>;
}

//-- Api --// 

export interface ApiData {
  total: number;
  items: IProduct[];
}

export interface ApiDataOrder {
  id: string;
  total: number;
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[];         
}

export interface ApiDataProm {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, 
    data: object, 
    method?: ApiPostMethods): Promise<T>;
}
