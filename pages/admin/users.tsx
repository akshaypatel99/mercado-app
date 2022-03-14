import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';
import AdminUsers from '../../components/AdminUsers';

export default function AllProducts({ users, error, count }) {
	return (
		<>
			<BackTo text='Admin Dashboard' href='admin' />
			<Title title='All Users' />
			{users.length < 1 && <InfoMessage message='No users yet' />}
			{users && users.length > 0 && <AdminUsers users={users} count={count} />}
			{error && <ErrorMessage error={error} />}
		</>
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
			query AllUsers($params: QueryParams) {
				users(params: $params) {
					info {
						count
					}
					results {
						_id
						name
						email
						role
						userProducts {
							_id
						}
						userOrders {
							_id
						}
						userWatchList {
							_id
						}
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
	});

	return {
		props: {
			users: data.users.results,
			error: error || null,
			count: data.users.info.count,
		},
	};
};
