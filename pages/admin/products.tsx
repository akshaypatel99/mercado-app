import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import ErrorMessage from '../../components/Message/ErrorMessage';
import InfoMessage from '../../components/Message/InfoMessage';
import AdminProducts from '../../components/Admin/AdminProducts';
import { Container } from '@chakra-ui/react';
import { ApolloError } from 'apollo-server-micro';

export default function AllProducts({
	products,
	error,
	count,
}: AllProductsPageProps) {
	return (
		<Container variant='page'>
			<BackTo text='Admin Dashboard' href='admin' />
			<Title title='All Products' />
			{products.length < 1 && <InfoMessage message='No products yet' />}
			{products && products.length > 0 && (
				<AdminProducts products={products} count={count} />
			)}
			{error && <ErrorMessage error={error} />}
		</Container>
	);
}

export type AdminProduct = {
	_id: string;
	user: {
		_id: string;
		name: string;
	};
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
	isSold: boolean;
	soldOn: Date;
	orders: {
		_id: string;
		createdAt: Date;
	}[];
	watchedBy: {
		_id: string;
		name: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
};

export type AllProductsProps = {
	products: AdminProduct[];
	count: number;
};

type AllProductsPageProps = AllProductsProps & { error: ApolloError | null };

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
			query AllProducts($params: QueryParams) {
				products(params: $params) {
					info {
						count
					}
					results {
						_id
						user {
							_id
							name
						}
						name
						description
						image
						category
						price
						isSold
						soldOn
						orders {
							_id
							createdAt
						}
						watchedBy {
							_id
							name
						}
						createdAt
						updatedAt
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
			products: data.products.results,
			error: error || null,
			count: data.products.info.count,
		},
	};
};
