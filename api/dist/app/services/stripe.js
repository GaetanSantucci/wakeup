import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
const createStripeOrder = async (req, res) => {
    // ? Extract the cart and delivery cost from the request body
    const { cart, deliveryCost, bookingDate } = req.body.cart;
    const user = req.body.user;
    const customer = await stripe.customers.create({
        name: `${user.lastname} ${user.firstname}`,
        phone: user.phone,
        email: user.email,
        address: {
            city: user.address.city,
            line1: user.address.line1,
            line2: user.address.line2,
            postal_code: user.address.postcode
        }
    });
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
    // ? Create a new Stripe checkout session using the line items and delivery cost
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer: customer.id,
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
            }],
        metadata: {
            lastname: user.lastname.toString(),
            firstname: user.firstname.toString(),
            phone: user.phone.toString(),
            bookingDate: bookingDate.toString(),
            cart: JSON.stringify(cart)
        }
    });
    res.json({ url: session.url });
};
export { createStripeOrder };
