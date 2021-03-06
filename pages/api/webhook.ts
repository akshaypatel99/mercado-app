import { buffer } from 'micro';
import Stripe from 'stripe';
import { Order, Product, User } from '../../db/models';
import connectDB from '../../db/config';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @ts-ignore
const fulfillOrder = async (session) => {
  await connectDB();

  const { customerId, productId } = session.metadata;

  const user = await User.findById(customerId);
  const product = await Product.findById(productId);

  const order = new Order({
    user: user._id,
    product: product._id,
    subTotal: session.amount_subtotal / 100,
    deliveryCost: session.total_details.amount_shipping / 100,
    platformFee: (session.amount_subtotal - (session.amount_subtotal / 1.03)) / 100,
    totalCost: session.amount_total / 100,
    deliveryAddress: {
    name: session.shipping.name,
    street: session.shipping.address.line1,
    city: session.shipping.address.city,
    postcode: session.shipping.address.postal_code,
  },
    paymentResult: {
    id: session.payment_intent,
    status: session.payment_status,
    email: session.customer.email,
  },
    isPaid: session.payment_status === 'paid',
    paidAt: new Date(),
  });

  user.userOrders.push(order._id);
  product.isSold = true;
  product.soldOn = order.paidAt;
  product.orders.push(order._id);
  
  await order.save();
  await user.save();
  await product.save();

  return {
    message: 'Order created!',
    order,
  };
}

export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    let event: Stripe.Event;

    try {
      if (!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      const error = err as Stripe.StripeError;
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      if (session) {
        // Fulfill the purchase...
        return fulfillOrder(session)
        .then(result => {
          console.log('Order fulfilled', result);
          res.status(200).end();
        })
        .catch(error => {
          console.log('Error fulfilling order', error);
          res.status(400).send(`Webhook Error: ${error.message}`);
        });
      }
    }
  }
}