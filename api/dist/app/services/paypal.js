const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};
// ? se the PayPal API to create an order
const createPaypalOrder = async (req, res) => {
    // ? Extract the cart array from the request body
    const { cart, user } = req.body;
    console.log('req.body:', req.body);
    console.log('user:', user);
    //  ? Calculate the total amount of the order based on the cart items
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    try {
        // ? Generate an access token for the PayPal API
        const accessToken = await generateAccessToken();
        // ? Set the API endpoint URL for creating orders
        const url = `${baseURL.sandbox}/v2/checkout/orders`;
        // ? Send a POST request to the API to create a new order
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
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(500).json(err.message);
    }
};
// use the orders api to capture payment for an order
const capturePaypalPayment = async (orderId, res) => {
    try {
        // ? Call access token  function to connect to the PayPal API
        const accessToken = await generateAccessToken();
        const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
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
        return data;
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(500).json(err.message);
    }
};
// ? Generate an access token using client id and app secret
const generateAccessToken = async () => {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET_KEY).toString("base64");
    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
};
export { createPaypalOrder, capturePaypalPayment };
