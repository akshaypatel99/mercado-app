import { useContext, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckoutContext } from '../context/CheckoutContext';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import formatPrice from '../lib/formatPrice';
import getStripe from '../helpers/get-stripejs';

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
					<Link href={`/product/${checkoutItem._id}`} passHref>
						<Image
							boxSize='600px'
							objectFit='cover'
							src={checkoutItem.image}
							alt={checkoutItem.name}
							cursor='pointer'
						/>
					</Link>
					<Box
						ml='16'
						w='100%'
						height='md'
						display='flex'
						flexDir='column'
						justifyContent='space-around'
					>
						<Box>
							<Heading fontSize='3xl'>{checkoutItem.name}</Heading>
							<Heading fontSize='3xl' mt='2'>
								{formatPrice(checkoutItem.price)}
							</Heading>
							<Text mt='4'>{checkoutItem.description}</Text>
						</Box>
						<Box display='flex' flexDir='column'>
							<Button
								size='sm'
								w='50%'
								my='2'
								colorScheme='yellow'
								onClick={() => cancelCheckout()}
							>
								Cancel
							</Button>
							<Button
								size='sm'
								w='50%'
								my='2'
								color='brand.white'
								bg='brand.500'
								_hover={{ bg: 'brand.600' }}
								_active={{ bg: 'brand.700' }}
								onClick={() => createCheckoutSession(checkoutItem)}
							>
								Proceed to Checkout
							</Button>
						</Box>
					</Box>
					<ErrorMessage error={error} />
				</Box>
			)}
		</>
	);
}
