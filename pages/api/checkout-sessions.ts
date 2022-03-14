const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { item, user } = req.body;

			// Item price plus platform fee in pennies
			const totalUnitCost = Math.round(parseFloat(item.price) * 1.03 * 100);

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
					unit_amount: totalUnitCost,
				},
				quantity: 1,
			}
			
			
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [
					transformedItem
				],
				customer_email: user.email,
				shipping_rates: ['shr_1KdM7iKzI3g5BI4tlyov94h2'],	
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
			res.status(200).json({ id: session.id });
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
