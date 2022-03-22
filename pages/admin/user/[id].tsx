import { gql } from '@apollo/client';
import client from '../../../lib/apollo-client';
import checkUser, { MyPageContext } from '../../../lib/checkUser';
import { GetServerSideProps } from 'next';
import UserProfile from '../../../components/User/UserProfile';
import UserOrders from '../../../components/User/UserOrders';
import ErrorMessage from '../../../components/Message/ErrorMessage';
import UserProducts from '../../../components/User/UserProducts';
import { Box, Container, Heading } from '@chakra-ui/react';
import BackTo from '../../../components/Common/BackTo';
import { UserProfileProps } from '../../account/profile';

export default function UserPage({ error, user }: UserProfileProps) {
	return (
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
