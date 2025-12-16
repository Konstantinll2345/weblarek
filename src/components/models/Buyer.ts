import { IBuyer, TPayment, BuyerValid } from "../../types/index"

  export class  Buyer {
    private payment: TPayment = "";
    private address: string = "";
    private phone: string = "";
    private email: string = "";

  constructor() {
    
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;
  }

  getData(): IBuyer {
    return {
      payment: this.payment || "",
      address: this.address || "",
      phone: this.phone || "",
      email: this.email || ""
    };
  }

  clear(): void {
    this.payment = ""; 
    this.address = "";
    this.phone = "";
    this.email = "";
  }

  validate(): BuyerValid {
    const errors: Partial<Record<keyof IBuyer, string>> = {};
    
    if (!this.payment || !this.payment.trim()) {
      errors.payment = "Не выбран способ оплаты";
    }
    
    if (!this.email || !this.email.trim()) {
      errors.email = "Не указан email";
    }
    
    if (!this.phone || !this.phone.trim()) {
      errors.phone = "Не указан телефон";
    }
    
    if (!this.address || !this.address.trim()) {
      errors.address = "Не указан адрес";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}