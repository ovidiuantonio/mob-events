const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY);

async function CreateStripeSession(req, res) {
  const { item } = req.body;

  const redirectURL = 'https://mob-events-1vshywbeo-ovidiuantonio.vercel.app'

  const transformedItem = {
    price_data: {
      currency: 'ron',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: redirectURL + '?status=success',
    cancel_url: redirectURL + '?status=cancel',
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
