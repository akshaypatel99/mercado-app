import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloError } from 'apollo-server-micro';
import { Container } from '@chakra-ui/react';
import client from '../../lib/apollo-client';
import checkUser from '../../lib/checkUser';
import Order from '../../components/Order/Order';
import ErrorMessage from '../../components/Message/ErrorMessage';
import BackLink from '../../components/Common/BackLink';

export default function OrderPage({ order, error, user }: OrderPageProps) {
	return (
		<>
			<Head>
				<title>Order #{order._id} | Mercado</title>
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
				{error && <ErrorMessage error={error} />}
				<BackLink />
				<Order order={order} user={user} />
			</Container>
		</>
	);
}

export type OrderProps = {
	order: {
		_id: string;
		user: {
			_id: string;
			name: string;
			email: string;
		};
		product: {
			_id: string;
			name: string;
			image: string;
			price: number;
			user: {
				_id: string;
				name: string;
			};
		};
		subTotal: number;
		deliveryCost: number;
		platformFee: number;
		totalCost: number;
		deliveryAddress: {
			name: string;
			street: string;
			city: string;
			postcode: string;
		};
		paymentResult: {
			status: string;
		};
		paidAt: Date;
		createdAt: Date;
	};
	user: {
		_id: string;
		role: string;
	} | null;
};

type OrderPageProps = OrderProps & { error: ApolloError | null };

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your order',
	});

	const id = context.params?.id;

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
			user,
		},
	};
};
