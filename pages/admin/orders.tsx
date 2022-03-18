import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';
import AdminOrders from '../../components/AdminOrders';
import { Container } from '@chakra-ui/react';

export default function AllProducts({ orders, error, count }) {
	return (
		<Container variant='page'>
			<BackTo text='Admin Dashboard' href='admin' />
			<Title title='All Orders' />
			{orders.length < 1 && <InfoMessage message='No orders yet' />}
			{orders && orders.length > 0 && (
				<AdminOrders orders={orders} count={count} />
			)}
			{error && <ErrorMessage error={error} />}
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});
	const Cookie = context.req.headers.cookie;
	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query AllOrders($params: QueryParams) {
				orders(params: $params) {
					info {
						count
					}
					results {
						_id
						user {
							_id
							name
						}
						product {
							_id
							name
						}
						subTotal
						platformFee
						totalCost
						isPaid
						paidAt
						createdAt
					}
				}
			}
		`,
		variables: {
			params: {
				pageSize: 100,
				page: 1,
			},
		},
		fetchPolicy: 'network-only',
	});

	return {
		props: {
			orders: data.orders.results,
			error: error || null,
			count: data.orders.info.count,
		},
	};
};
