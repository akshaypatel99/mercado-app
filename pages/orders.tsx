import { Center, Heading } from '@chakra-ui/react';
import OrderList from '../components/OrderList';
import Title from '../components/Title';

export default function Orders() {
	return (
		<>
			<Title title='My Orders' />
			<OrderList />
		</>
	);
}
