const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { item, user } = req.body;

			const transformedItem = {
				price_data: {
					currency: 'gbp',
					product_data: {
						name: item.name,
						images: [item.image],
						description: item.description,
						metadata: {
							product_id: item._id,
							customer: user._id,
							vendor: item.user._id,
							priceAtPurchase: item.price,
						}
					},
					unit_amount: parseInt(item.price) * 100,
				},
				quantity: 1,
			}
			
			
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [
					transformedItem
				],
				customer_email: user.email,
				shipping_rates: ['shr_1KWkWPKzI3g5BI4tMgN69Qxh'],	
				shipping_address_collection: {
					allowed_countries: ['GB'],
				},
				mode: 'payment',
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/checkout?canceled=true`,
				metadata: {
					customerId: user._id,
					customerName: user.name,
					customerEmail: user.email,
					productId: item._id,
				}
			});
			res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
