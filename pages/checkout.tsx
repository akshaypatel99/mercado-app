import { useContext, useEffect, useState } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import { AuthContext } from '../context/AuthContext';
import CheckoutItem from '../components/CheckoutItem';
import getStripe from '../helpers/get-stripejs';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function Checkout() {
	const [cancelled, setCancelled] = useState(false);

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
			<Box mb='4' fontSize='sm'>
				<Link href='/products'>Back to all products</Link>
			</Box>
			<CheckoutItem />
		</>
	);
}
