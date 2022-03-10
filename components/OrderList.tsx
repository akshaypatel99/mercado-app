import { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import LoginRedirect from './LoginRedirect';
import { localDate } from '../lib/localDate';
import ErrorMessage from './ErrorMessage';

export const USER_ORDERS = gql`
	query UserOrders {
		userOrders {
			_id
			product {
				name
				description
				image
				price
			}
			createdAt
			paidAt
			deliveryAddress {
				name
				street
				city
				postcode
			}
			subTotal
			deliveryCost
			totalCost
		}
	}
`;

export default function OrderList() {
	const { user } = useContext(AuthContext);
	const { data, loading, error } = useQuery(USER_ORDERS);

	if (!user) {
		return <LoginRedirect message='view your orders' />;
	}

	if (loading) {
		return (
			<Center>
				<Spinner color='brand.500' />
			</Center>
		);
	}

	return (
		<>
			{error && <ErrorMessage error={error} />}
			{data &&
				data.userOrders.length > 0 &&
				data.userOrders.map((order) => (
					<Box key={order._id}>
						<p>{order.product.name}</p>
						<p>{localDate(order.createdAt)}</p>
						<p>{order.paidAt}</p>
						<p>{order.subTotal}</p>
						<p>{order.deliveryCost}</p>
						<p>{order.totalCost}</p>
						<p>{order.deliveryAddress.postcode}</p>
					</Box>
				))}
		</>
	);
}
