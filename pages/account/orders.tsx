import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import OrderList from '../../components/User/UserOrders';
import Title from '../../components/Common/Title';
import ErrorMessage from '../../components/Message/ErrorMessage';
import InfoMessage from '../../components/Message/InfoMessage';
import { Container } from '@chakra-ui/react';

export default function Orders({ orders, error }) {
	return (
		<Container variant='page'>
			<BackTo text='My Account' href='account' />
			<Title title='My Orders' />
			{orders.length < 1 && <InfoMessage message='No orders yet' />}
			{orders && orders.length > 0 && <OrderList orders={orders} />}
			{error && <ErrorMessage error={error} />}
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your orders',
	});
	const Cookie = context.req.headers.cookie;
	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query UserOrders {
				userOrders {
					_id
					product {
						_id
						name
					}
					createdAt
					subTotal
					totalCost
				}
			}
		`,
	});

	return {
		props: {
			orders: data.userOrders,
			error: error || null,
		},
	};
};
