export type StripeItem = {
  price_data: {
    currency: string;
    product_data: {
      images: string[];
      name: string;
    };
    unit_amount: number;
  };
  description: string;
  quantity: number;
};

export type CartItems = {
  map(arg0: (item: CartItems) => { name: string; price: number; currency: string; quantity: number; }): unknown;
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}