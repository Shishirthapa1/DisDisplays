export type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  discount: number;
  description: string;
  image?: string;
  productType?: string;
  category: {
    _id: string;
    name: string;
  };
};

export interface CreatePaymentIntentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  clientSecret: string;
}

export interface CreateOrderPayload {
  user: {
    fullname: string;
    email: string;
    phoneNumber: string;
  };
  shippingAddress: {
    street: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  products: {
    product: string; // Product ID
    quantity: number;
  }[];
  totalAmount: number;
}

export interface CreateOrderResponse {
  success: boolean;
  order: any;
}
