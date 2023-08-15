type PurchaseUnits = {
  shipping: string,
  payments: string
}

export type DataPaypal = {
  id: string,
  amount_total: number,
  created: string,
  payment_method_types: Array<string>,
  status: string,
  payer: {
    given_name: string,
    surname: string,
    email_address: string
  }
  purchase_units: PurchaseUnits[]
}
