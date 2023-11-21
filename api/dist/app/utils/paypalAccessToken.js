import debug from 'debug'
const logger = debug('Utils')
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env

const base = 'https://api-m.paypal.com' // production mode, for sandbox mode use https://api-m.sandbox.paypal.com

const createOrder = async req => {
  try {
    const cart = req.body?.cart
    const totalAmount = req.body?.totalAmount
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders`

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: totalAmount,
            },
            items: cart.map(item => ({
              name: item.name,
              // "sku": "sku03", // insert description
              price: item.price,
              currency: 'EUR',
              quantity: item.quantity,
            })),
            shipping_method: 'Frais de livraison',
            partner_fee_details: {
              receiver: {
                email: 'contact@wakeupbox.fr',
              },
              amount: {
                value: '3.50',
                currency: 'EUR',
              },
            },
          },
        ],
      }),
    })
    return handleResponse(response)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}
const capturePayment = async orderId => {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders/${orderId}/capture`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return handleResponse(response)
}
const generateAccessToken = async () => {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_SECRET_KEY).toString(
    'base64'
  )
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
  const jsonData = await handleResponse(response)
  const accessToken = jsonData.access_token
  return accessToken
}
const handleResponse = async res => {
  if (res.status === 200 || res.status === 201) return res.json()
  const errorMessage = await res.text()
  throw new Error(errorMessage)
}
export { createOrder, capturePayment, generateAccessToken, handleResponse }
