import { Request, Response } from 'express';

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

// use the orders api to create an order
const createOrder = async (req: Request, res: Response) => {
  const { cart } = req.body
  console.log('cart dans le create order:', cart);

  const totalAmount = cart.reduce((total: number, item: { price: string, quantity: number }) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)

  console.log('totalAmount:', totalAmount);
  try {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: totalAmount
            },
            redirect_urls: {
              return_url: `${process.env.CLIENT_URL}/checkout/success`,
              cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`
            },
            item_list: {
              cart
            }
          },
        ],
      }),
    });
    const data = await response.json();
    console.log('response de la requete dans le create :', data);
    return data;
  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }

}

// use the orders api to capture payment for an order
const capturePayment = async (orderId: string, res: Response) => {
  console.log("Je passe dans le capturePayment");


  try {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('data:', data);
    return data;

  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }
}

// generate an access token using client id and app secret
const generateAccessToken = async () => {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET_KEY).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

export { capturePayment, createOrder }