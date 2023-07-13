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
  // map(arg0: (item: CartItems) => { name: string; unit_amount: { currency_code: string, value: number }, quantity: number; }): unknown;
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export type LineItems = {
  name: string,
  unit_amount: {
    currency_code: string,
    value: number,
  },
  quantity: number,
}

export type DataStripe = {
  id: string,
  amount_total: number,
  created: string,
  currency: string
  payment_method_types: Array<string>,
  payment_status: string,
  customer_details: {
    email: string,
    address: {
      line1: string,
      line2: string,
      city: string,
      postal_code: number
    }
  },
  metadata: {
    lastname: string,
    firstname: string,
    bookingDate: string,
    cart: string
  }
}