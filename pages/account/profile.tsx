import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import UserProfile from '../../components/UserProfile';
import ErrorMessage from '../../components/ErrorMessage';

export default function MyDetails({ user, error }) {
	return (
		<>
			<BackTo text='My Account' href='account' />
			<Title title='My Details' />
			{user && <UserProfile user={user} />}
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
					userWatchList {
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
