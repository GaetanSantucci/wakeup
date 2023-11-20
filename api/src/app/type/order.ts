export type OrderBody = {
  booking_date: string
  payment_status: string
  payment_id: string
  amount: number
  payment_date: string | number // Update this line
  payment_method: string
  cart: any
  user: {
    email: string
    lastname: string
    firstname: string
    phone: string
    address: {
      line1: string
      line2?: string
      city: string
      postcode: string
    }
  }
}
