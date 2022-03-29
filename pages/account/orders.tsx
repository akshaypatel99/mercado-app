import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloError } from 'apollo-server-micro';
import { Container } from '@chakra-ui/react';
import checkUser from '../../lib/checkUser';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import OrderList from '../../components/User/UserOrders';
import Title from '../../components/Common/Title';
import ErrorMessage from '../../components/Message/ErrorMessage';
import InfoMessage from '../../components/Message/InfoMessage';

export default function Orders({ orders, error }: UserOrdersProps) {
	return (
		<>
			<Head>
				<title>My Orders | Mercado</title>
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
				<BackTo text='My Account' href='account' />
				<Title title='My Orders' />
				{orders.length < 1 && <InfoMessage message='No orders yet' />}
				{orders && orders.length > 0 && <OrderList orders={orders} />}
				{error && <ErrorMessage error={error} />}
			</Container>
		</>
	);
}

export type UserOrdersType = {
	_id: string;
	product: {
		_id: string;
		name: string;
	};
	createdAt: Date;
	subTotal: number;
	totalCost: number;
}[];

type UserOrdersProps = {
	orders: UserOrdersType;
	error: ApolloError | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = await checkUser(context, {
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
