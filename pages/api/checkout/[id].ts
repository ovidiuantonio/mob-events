import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(id as string, {expand: ['payment_intent']})
  res.status(200).json({ session });
}
