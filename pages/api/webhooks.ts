import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function webhookHandler(req, res) {

  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (error) {
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`💰 Payment received! Session: ${session.id}`);

      // Fulfill the purchase...
    }
  }
}