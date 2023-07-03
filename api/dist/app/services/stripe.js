import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
const createStripeOrder = async (req, res) => {
    // ? Extract the cart and delivery cost from the request body
    const { cart, deliveryCost } = req.body.cart;
    // ? Map on cart to list all articles
    const lineItems = cart.map((item) => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));
    try {
        // ? Create a new Stripe checkout session using the line items and delivery cost
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout/success`,
            cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
            shipping_options: [{
                    shipping_rate_data: {
                        display_name: 'Frais de livraison',
                        type: 'fixed_amount',
                        fixed_amount: {
                            currency: 'eur',
                            amount: deliveryCost * 100,
                        }
                    }
                }]
        });
        console.log('session:', session);
        res.json({ id: session.id, url: session.url });
    }
    catch (err) {
        if (err instanceof Error)
            return res.status(500).json(err.message);
    }
};
export { createStripeOrder };
