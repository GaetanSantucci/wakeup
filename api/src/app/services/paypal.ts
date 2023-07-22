import { Request, Response } from 'express';

const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

// ? se the PayPal API to create an order
const createPaypalOrder = async (req: Request, res: Response) => {
  // ? Extract the cart array from the request body
  const { cart } = req.body

  //  ? Calculate the total amount of the order based on the cart items
  const totalAmount = cart.reduce((total: number, item: { price: string, quantity: number }) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)

  try {
    // ? Generate an access token for the PayPal API
    const accessToken = await generateAccessToken();
    // ? Set the API endpoint URL for creating orders
    const url = `${baseURL.sandbox}/v2/checkout/orders`;

    const orderBody = {
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
          item_list: cart,
          custom: JSON.stringify({
            bookingDate: req.body.bookingDate,
            user: req.body.user
          })
        }
      ]
    }

    // ? Send a POST request to the API to create a new order
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderBody),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }

}

// use the orders api to capture payment for an order
const capturePaypalPayment = async (req: Request, res: Response) => {
  console.log('req dasn le capture payment:', req.body);

  try {
    // ? Call access token  function to connect to the PayPal API
    const accessToken = await generateAccessToken();

    const url = `${baseURL.sandbox}/v2/checkout/orders/${req.body.orderID}/capture`;

    // ? Send a POST request to the API to capture a new order
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('data:', data);

    // const customData = JSON.parse(data.purchase_units[0].custom);
    // const bookingDate = customData.bookingDate;
    // console.log('bookingDate:', bookingDate);
    // const user = customData.user;
    // console.log('user:', user);
    return data;

  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }
}

// ? Generate an access token using client id and app secret
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

export { createPaypalOrder, capturePaypalPayment }
