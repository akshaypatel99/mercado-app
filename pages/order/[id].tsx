import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import Order from '../../components/Order/Order';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { GetServerSideProps } from 'next';
import ErrorMessage from '../../components/Message/ErrorMessage';
import BackLink from '../../components/Common/BackLink';
import { Container } from '@chakra-ui/react';

export default function OrderPage({ order, error, user }) {
	return (
		<Container variant='page'>
			{error && <ErrorMessage error={error} />}
			<BackLink />
			<Order order={order} user={user} />
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your order',
	});

	const { id } = context.params;

	const Cookie = context.req.headers.cookie;

	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query SingleOrder($orderId: ID!) {
				order(id: $orderId) {
					_id
					user {
						_id
						name
						email
					}
					product {
						_id
						name
						image
						price
						user {
							_id
							name
						}
					}
					subTotal
					deliveryCost
					platformFee
					totalCost
					deliveryAddress {
						name
						street
						city
						postcode
					}
					paymentResult {
						status
					}
					paidAt
					createdAt
				}
			}
		`,
		variables: {
			orderId: id,
		},
	});

	return {
		props: {
			order: data.order,
			error: error || null,
			user: context.user,
		},
	};
};
