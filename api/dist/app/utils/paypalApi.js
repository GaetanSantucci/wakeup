import debug from 'debug';
const logger = debug('Utils');
const { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const createOrder = async (req) => {
    try {
        // Get the cart and total amount from the request body
        const cart = req.body?.cart;
        const totalAmount = req.body?.totalAmount;
        // Convert the cart items to line items for the payment gateway
        const lineItems = cart.map((item) => ({
            name: item.name,
            unit_amount: {
                currency_code: "EUR",
                value: item.price,
            },
            quantity: item.quantity
        }));
        // Calculate the total amount of the line items
        const itemTotal = lineItems.reduce((total, item) => total + item.unit_amount.value * item.quantity, 0);
        // Generate an access token for the payment gateway
        const accessToken = await generateAccessToken();
        console.log('accessToken:', accessToken);
        // Set the URL for creating a new order
        const url = `${base}/v2/checkout/orders`;
        // Make a POST request to create a new order
        const response = await fetch(url, {
            method: "post",
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
                            value: totalAmount,
                            breakdown: {
                                item_total: {
                                    currency_code: "EUR",
                                    value: itemTotal,
                                },
                            },
                        },
                        items: { lineItems },
                        redirect_urls: {
                            return_url: `${process.env.CLIENT_URL}/checkout-success`,
                            cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`
                        }
                    },
                ],
            }),
        });
        console.log('response:', response);
        return handleResponse(response);
    }
    catch (err) {
        // Log any errors that occur
        if (err instanceof Error)
            logger(err.message);
    }
};
const capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
};
const generateAccessToken = async () => {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET_KEY).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const jsonData = await handleResponse(response);
    const accessToken = jsonData.access_token;
    return accessToken;
};
const handleResponse = async (res) => {
    if (res.status === 200 || res.status === 201)
        return res.json();
    const errorMessage = await res.text();
    throw new Error(errorMessage);
};
export { createOrder, capturePayment, generateAccessToken, handleResponse };
