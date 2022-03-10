import { Center, Heading } from '@chakra-ui/react';
import OrderList from '../components/OrderList';

export default function Orders() {
	return (
		<>
			<Center mb='8'>
				<Heading>Your Orders</Heading>
			</Center>
			<OrderList />
		</>
	);
}
