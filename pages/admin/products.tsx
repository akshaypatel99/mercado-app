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

export default function AllProducts({ products, error, count }) {
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
							name
							_id
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
