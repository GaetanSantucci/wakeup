const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};
// ? se the PayPal API to create an order
const createPaypalOrder = async (req, res) => {
    const { cart } = req.body;
    //  ? Calculate the total amount of the order based on the cart items
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    // ? Map on cart to list all articles
    const lineItems = cart.map((item) => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: item.name,
            },
            unit_amount: (item.price * 100).toFixed(0),
        },
        quantity: item.quantity,
    }));
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
                        value: totalAmount,
                        breakdown: {
                            item_total: {
                                currency_code: "EUR",
                                value: totalAmount
                            },
                        }
                    },
                    redirect_urls: {
                        return_url: `${process.env.CLIENT_URL}/checkout/success`,
                        cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`
                    },
                    item_list: lineItems,
                    custom: {
                        booking_date: req.body.bookingDate,
                        user_firstname: req.body.user.firstname,
                        user_lastname: req.body.user.lastname,
                        address: req.body.user.address,
                        cart: lineItems
                    }
                }
            ]
        };
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
        console.log('data:', data);
        return data;
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(500).json(err.message);
    }
};
// use the orders api to capture payment for an order
const capturePaypalPayment = async (req, res) => {
    console.log('req dans le capture payment:', req.body);
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
