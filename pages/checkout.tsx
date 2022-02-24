import { useContext, useEffect, useState } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import { AuthContext } from '../context/AuthContext';
import CheckoutItem from '../components/CheckoutItem';
import getStripe from '../helpers/get-stripejs';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = getStripe();

export default function Checkout() {
	const [cancelled, setCancelled] = useState(false);
	const { checkoutItem } = useContext(CheckoutContext);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get('canceled')) {
			setCancelled(true);
			console.log(
				'Order canceled -- continue to shop around and checkout when you’re ready.'
			);
		}
	}, []);

	return (
		<>
			<CheckoutItem />
		</>
	);
}
