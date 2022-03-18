import { useContext, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { CheckoutContext } from '../../context/CheckoutContext';
import { Box, Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import ErrorMessage from '../Message/ErrorMessage';
import formatCurrency from '../../lib/formatCurrency';
import getStripe from '../../lib/get-stripejs';
import Policy from './Policy';

export default function CheckoutItem() {
	const [error, setError] = useState(null);
	const { checkoutItem, cancelCheckout } = useContext(CheckoutContext);
	const { user } = useContext(AuthContext);

	if (!checkoutItem) {
		return null;
	}

	const createCheckoutSession = async (checkoutItem) => {
		// Initialize Stripe.js
		const stripe = await getStripe();

		// Create a Checkout Session for the order
		const checkoutSession = await axios.post('/api/checkout-sessions', {
			item: checkoutItem,
			user: user,
		});

		// When Checkout Session is created, redirect to Checkout page
		const stripeCheckout = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});

		// If Checkout Session creation fails, display the error
		if (stripeCheckout.error) {
			setError(error);
		}
	};

	return (
		<>
			{checkoutItem && (
				<Box display='flex' alignItems='center' p='2' mb='4'>
					<Box w='66%'>
						<Link href={`/product/${checkoutItem._id}`} passHref>
							<Image
								boxSize='400px'
								objectFit='cover'
								src={checkoutItem.image}
								alt={checkoutItem.name}
								cursor='pointer'
							/>
						</Link>
					</Box>
					<Box ml='16' w='100%'>
						<VStack align='flex-start' spacing={4}>
							<Heading fontSize='3xl' variant='product'>
								{checkoutItem.name}
							</Heading>
							<Heading fontSize='3xl' variant='product' mt='2'>
								{formatCurrency(checkoutItem.price)}
							</Heading>
							<Text>
								Platform fee (3%):{' '}
								<strong>{formatCurrency(checkoutItem.price * 0.03)}</strong>
							</Text>
							<Text>
								Delivery cost: <strong>£3.95</strong>
							</Text>
							<Heading fontSize='3xl' variant='product'>
								Total:{' '}
								<strong>
									{formatCurrency(checkoutItem.price * 1.03 + 3.95)}
								</strong>
							</Heading>
						</VStack>

						<VStack align='flex-start' my='8'>
							<Button
								size='md'
								w='50%'
								variant='primary'
								onClick={() => createCheckoutSession(checkoutItem)}
							>
								Proceed to Checkout
							</Button>
							<Button
								size='md'
								w='50%'
								colorScheme='yellow'
								onClick={() => cancelCheckout(checkoutItem._id)}
							>
								Cancel
							</Button>
						</VStack>
						<Policy />
					</Box>
				</Box>
			)}
			{error && <ErrorMessage error={error} />}
		</>
	);
}
