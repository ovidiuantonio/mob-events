import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../../../firebase";

import Stripe from "stripe";
const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY!, {
  apiVersion: "2020-08-27",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
      return;
    }

    console.log("success", event.id);

    // if (event.type === "payment_intent.succeeded") {
    //   const paymentIntent = event.data.object as Stripe.PaymentIntent;
    // } else if (event.type === "payment_intent.payment_failed") {
    //   const paymentIntent = event.data.object as Stripe.PaymentIntent;
    //   console.log(paymentIntent.last_payment_error?.message);
    // } else if (event.type === "charge.succeeded") {
    //   const charge = event.data.object as Stripe.Charge;
    //   console.log(charge.id);
    // } else {
    //   console.log(event.type);
    // }

    if (event.type === "checkout.session.completed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const eventId = paymentIntent.metadata.event;
      const email = paymentIntent.metadata.customer_email;
      const name = paymentIntent.metadata.customer_name;
      const tel = paymentIntent.metadata.customer_tel;
      const id = paymentIntent.id;

      await setDoc(doc(db, `tables-${eventId}`, `${id}`), {
        name: name,
        email: email,
        tel: tel,
        date: new Date(),
      });
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

export default cors(webhookHandler as any);
