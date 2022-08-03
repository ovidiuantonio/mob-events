import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { item } = req.body;

  const redirectURL = "http://localhost:3000";

  const transformedItem = {
    price_data: {
      currency: "ron",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    customer_email: item.email,
    mode: "payment",
    success_url: redirectURL + "/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: redirectURL + "/fail?session_id={CHECKOUT_SESSION_ID}",
  });

  res.status(200).json({ id: session.id });
}
