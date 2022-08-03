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

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      //   const collectionRef = collection(db, "upcoming-events");
      //   const getTables = async () => {
      //     const list = await getDocs(collectionRef);
      //     let events = [];
      //     events = list.docs.map((event) => ({
      //       ...event.data(),
      //       id: event.id,
      //     }));
      //     let position = events.map((ev, index) => {
      //       if (ev.path === metadata) {
      //         return index;
      //       }
      //     });
      //     let pos = position[0];
      //     const tables = events[pos].tables - 1;
      //     console.log(events[pos].tables);
      //     const tablesRef = doc(db, "upcoming-events", `${metadata}`);
      //     const tablesData = {
      //       tables: tables,
      //     };
      //     updateDoc(tablesRef, tablesData)
      //       .then((tablesRef) => {
      //         console.log("Value of an Existing Document Field has been updated");
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   };
      //   getTables();
      console.log("ok");
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(paymentIntent.last_payment_error?.message);
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
      console.log(charge.id);
    } else {
      console.log(event.type);
    }

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
    });

    res.json({ received: true, event: event.data.object });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

export default cors(webhookHandler as any);
