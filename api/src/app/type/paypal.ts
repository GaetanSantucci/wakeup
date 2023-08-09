export type DataPaypal = {
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