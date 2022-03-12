import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import OrderList from '../../components/UserOrders';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';

export default function Orders({ orders, error }) {
	return (
		<>
			<BackTo text='My Account' href='account' />
			<Title title='My Orders' />
			{orders.length < 1 && <InfoMessage message='No orders yet' />}
			{orders && orders.length > 0 && <OrderList orders={orders} />}
			{error && <ErrorMessage error={error} />}
		</>
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
		`,
	});

	return {
		props: {
			orders: data.userOrders,
			error: error || null,
		},
	};
};
