import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "@firebase/firestore";


const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      const rawBody = await buffer(req);
      const signature = req.headers["stripe-signature"];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).json({ message: `Webhook Error: ${err.message}` });
      return;
    }

    if (event.type === "checkout.session.completed") {
      let tables;
      const getTables = async(id) => {
        tables = await db.collection("upcoming-events").doc(id).tables
        tables = tables - 1;
      } 
      const updateEvent = async(id, updates) => {
        await db.collection("upcoming-events").doc(id).update(updates)
      }

      updateEvent(req.body.path, {tables: tables})
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
  }
}
