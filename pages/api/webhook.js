import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "../../firebase";
import { collection, getDocs, doc, setDoc } from "@firebase/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY);
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      const getTables = async () => {
        const docs = await getDocs(collection(db, `franka04082022`));
        const doclist = docs.docs.map((event) => ({
          ...event.data(),
          id: event.id,
        }));

        doclist.map((docitem, index) => {
          if (docitem.path === eventId) {
            const tablesRef = doc(db, "upcoming-events", `franka04082022`);

            setDoc(tablesRef, { tables: docitem.tables - 1 }, { merge: true });
          }
        });
      };

      getTables();

      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (error) {
      console.log("WH error");
      return res.status(400).send("WH error");
    }

    console.log(event);

    res.status(200).send({ buf: buf, sig: sig });
  }
}
