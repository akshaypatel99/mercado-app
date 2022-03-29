import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { Box, Container, Heading } from '@chakra-ui/react';
import client from '../../../lib/apollo-client';
import checkUser from '../../../lib/checkUser';
import UserProfile from '../../../components/User/UserProfile';
import UserOrders from '../../../components/User/UserOrders';
import ErrorMessage from '../../../components/Message/ErrorMessage';
import UserProducts from '../../../components/User/UserProducts';
import BackTo from '../../../components/Common/BackTo';
import { UserProfileProps } from '../../account/profile';

export default function UserPage({ error, user }: UserProfileProps) {
	return (
		<>
			<Head>
				<title>User #{user._id} | Mercado</title>
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
				<BackTo text='All Users' href='admin/users' />
				{error && <ErrorMessage error={error} />}
				<Box>
					<UserProfile user={user} />
				</Box>
				<Box my='8'>
					<Heading>Products</Heading>
					<UserProducts products={user.userProducts} />
				</Box>
				<Box>
					<Heading>Orders</Heading>
					<UserOrders orders={user.userOrders} />
				</Box>
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});

	const id = context.params?.id;

	const Cookie = context.req.headers.cookie;

	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query SingleUser($userId: ID!) {
				user(id: $userId) {
					_id
					name
					email
					role
					userProducts {
						_id
						name
						image
						price
						isSold
						soldOn
						watchedBy {
							_id
						}
						createdAt
					}
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
					userWatchlist {
						_id
					}
					createdAt
				}
			}
		`,
		variables: {
			userId: id,
		},
	});

	return {
		props: {
			error: error || null,
			user: data.user,
		},
	};
};
