import { useEffect, useState } from 'react';
import CheckoutItem from '../components/CheckoutItem';
import InfoMessage from '../components/InfoMessage';
import { Box, Center, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import BackToAll from '../components/BackToAll';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function Checkout() {
	const [cancel, setCancel] = useState({ isCancelled: false, message: '' });

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get('canceled')) {
			setCancel({
				isCancelled: true,
				message:
					'Order canceled - please continue to shop around and checkout when you’re ready.',
			});
			console.log(
				'Order canceled -- continue to shop around and checkout when you’re ready.'
			);
		}
	}, []);

	return (
		<>
			<BackToAll />
			<Center>
				<Heading>Your Basket</Heading>
			</Center>
			{cancel.isCancelled && <InfoMessage message={cancel.message} />}
			<CheckoutItem />
		</>
	);
}
