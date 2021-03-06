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
import AdminUsers from '../../components/Admin/AdminUsers';

export default function AllUsers({ users, error, count }: AllUsersPageProps) {
	return (
		<>
			<Head>
				<title>All Users | Mercado</title>
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
				<Title title='All Users' />
				{users.length < 1 && <InfoMessage message='No users yet' />}
				{users && users.length > 0 && (
					<AdminUsers users={users} count={count} />
				)}
				{error && <ErrorMessage error={error} />}
			</Container>
		</>
	);
}

export type AllUsers = {
	users: {
		_id: string;
		name: string;
		email: string;
		role: string;
		userProducts: {
			_id: string;
			price: number;
			isSold: boolean;
			watchedBy: {
				_id: string[];
			};
		}[];
		userOrders: {
			_id: string;
			totalCost: number;
		}[];
		userWatchlist: {
			_id: string;
		}[];
		createdAt: Date;
	}[];
	count: number;
};

type AllUsersPageProps = AllUsers & { error: ApolloError | null };

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
			users: data.users.results,
			error: error || null,
			count: data.users.info.count,
		},
	};
};
