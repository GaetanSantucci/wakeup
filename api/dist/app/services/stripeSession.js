var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Stripe from "stripe";
const CreateStripeSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const redirectURL = 'http://localhost:3000/checkout';
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { item } = req.body;
    // Rest of your code...
    const transformedItem = {
        price_data: {
            currency: 'eur',
            product_data: {
                images: [item.image],
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        // todo check description
        description: item.name,
        quantity: item.quantity,
    };
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [transformedItem],
        mode: 'payment',
        success_url: redirectURL + '?status=success',
        cancel_url: redirectURL + '?status=cancel',
        metadata: {
            images: item.image,
        },
    });
    res.json({ id: session.id });
});
export default CreateStripeSession;
