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
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}