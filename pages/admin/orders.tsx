import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloError } from 'apollo-server-micro';
import { Container } from '@chakra-ui/react';
import checkUser from '../../lib/checkUser';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import ErrorMessage from '../../components/Message/ErrorMessage';
import InfoMessage from '../../components/Message/InfoMessage';
import AdminOrders from '../../components/Admin/AdminOrders';

export default function AllOrders({
	orders,
	error,
	count,
}: AllOrdersPageProps) {
	return (
		<>
			<Head>
				<title>All Orders | Mercado</title>
				<meta
					name='description'
					content='Mercado - buy and sell second-hand items'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					rel='icon'
					href='images/logo-light.svg'
					sizes='any'
					type='image/svg+xml'
				/>
			</Head>
			<Container variant='page'>
				<BackTo text='Admin Dashboard' href='admin' />
				<Title title='All Orders' />
				{orders.length < 1 && <InfoMessage message='No orders yet' />}
				{orders && orders.length > 0 && (
					<AdminOrders orders={orders} count={count} />
				)}
				{error && <ErrorMessage error={error} />}
			</Container>
		</>
	);
}

export type AdminOrder = {
	_id: string;
	user: {
		_id: string;
		name: string;
	};
	product: {
		_id: string;
		name: string;
	};
	subTotal: number;
	platformFee: number;
	totalCost: number;
	isPaid: boolean;
	paidAt: Date;
	createdAt: Date;
};

export type AllOrdersProps = {
	orders: AdminOrder[];
	count: number;
};

type AllOrdersPageProps = AllOrdersProps & { error: ApolloError | null };

export const getServerSideProps: GetServerSideProps = async (context) => {
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
