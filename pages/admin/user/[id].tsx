import { gql } from '@apollo/client';
import client from '../../../lib/apollo-client';
import checkUser, { MyPageContext } from '../../../lib/checkUser';
import { GetServerSideProps } from 'next';
import UserProfile from '../../../components/UserProfile';
import UserOrders from '../../../components/UserOrders';
import ErrorMessage from '../../../components/ErrorMessage';
import UserProducts from '../../../components/UserProducts';
import { Box, Heading } from '@chakra-ui/react';

export default function UserPage({ error, user }) {
	return (
		<>
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
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, { level: 'ADMIN', redirect: false });

	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});

	const { id } = context.params;

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
