import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { CheckoutContext } from '../context/CheckoutContext';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import formatPrice from '../lib/formatPrice';
import getStripe from '../helpers/get-stripejs';

getStripe();

export default function CheckoutItem() {
	const { checkoutItem } = useContext(CheckoutContext);
	const { user } = useContext(AuthContext);

	if (!checkoutItem) {
		return null;
	}

	const createCheckoutSession = async (checkoutItem) => {
		await fetch('/api/checkout-sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				item: checkoutItem,
				user: user,
			}),
		});
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
						ml='2'
						w='100%'
						h='200px'
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
					<Box></Box>
				</Box>
			)}
		</>
	);
}
