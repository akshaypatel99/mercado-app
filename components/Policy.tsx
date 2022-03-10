import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiCheckSquare } from 'react-icons/fi';

export default function Policy() {
	return (
		<List spacing={2} my='6'>
			<ListItem>
				<ListIcon as={FiCheckSquare} color='brand.green' />
				Delivery is charged at a flat fee of £6.99 and takes 3-5 working days.
			</ListItem>
			<ListItem>
				<ListIcon as={FiCheckSquare} color='brand.green' />
				Secure payments with Stripe.
			</ListItem>
			<ListItem>
				<ListIcon as={FiCheckSquare} color='brand.green' />
				Refunds will be issued if the item doesn&apos;t arrive, is damaged or
				not as described.
			</ListItem>
			<ListItem>
				<ListIcon as={FiCheckSquare} color='brand.green' />
				Contact us 24/7 for any questions - we aim to reply within 24 hours.
			</ListItem>
		</List>
	);
}
