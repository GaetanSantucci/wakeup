export type CustomerType = {
  id: UUID;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  address: Address;
  phone: string;
  role: string;
  newsletter_optin?: boolean;
}

type Address = {
  label: string;
  complement?: string;
  city: string;
  zipcode: number;
  lat?: number;
  lon?: number;
}

export type UUID = string & { __uuid: true } 