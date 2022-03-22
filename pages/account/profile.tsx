import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import UserProfile from '../../components/User/UserProfile';
import ErrorMessage from '../../components/Message/ErrorMessage';
import { Container } from '@chakra-ui/react';
import { UserProductsType } from './products';
import { UserOrdersType } from './orders';
import { ApolloError } from 'apollo-server-micro';

export default function MyProfile({ user, error }: UserProfileProps) {
	return (
		<Container variant='page'>
			<BackTo text='My Account' href='account' />
			<Title title='My Details' />
			{user && <UserProfile user={user} />}
			{error && <ErrorMessage error={error} />}
		</Container>
	);
}

export type UserProfileType = {
	_id: string;
	name: string;
	email: string;
	role: string;
	userProducts: UserProductsType;
	userOrders: UserOrdersType;
	userWatchlist: {
		_id: string;
	}[];
	createdAt: Date;
};

export type UserProfileProps = {
	user: UserProfileType;
	error: ApolloError | null;
};

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your profile',
	});

	const Cookie = context.req.headers.cookie;
	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query CurrentUser {
				currentUser {
					_id
					name
					email
					role
					userProducts {
						_id
						price
						isSold
						watchedBy {
							_id
						}
					}
					userOrders {
						_id
						totalCost
					}
					userWatchlist {
						_id
					}
					createdAt
				}
			}
		`,
	});

	return {
		props: {
			user: data.currentUser,
			error: error || null,
		},
	};
};
