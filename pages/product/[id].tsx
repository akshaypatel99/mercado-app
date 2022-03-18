import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import Product from '../../components/Product';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { GetServerSideProps } from 'next';
import ErrorMessage from '../../components/ErrorMessage';
import BackLink from '../../components/BackLink';
import { Container } from '@chakra-ui/react';

export default function ProductPage({ product, error, user }) {
	return (
		<Container variant='page'>
			<BackLink />
			{error && <ErrorMessage error={error} />}
			<Product product={product} user={user} />
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: false,
	});

	const { id } = context.params;

	const { data, error } = await client.query({
		query: gql`
			query SingleProduct($productId: ID!) {
				product(id: $productId) {
					_id
					name
					description
					image
					category
					price
					user {
						_id
						name
					}
					watchedBy {
						_id
					}
					isSold
				}
			}
		`,
		variables: {
			productId: id,
		},
	});

	return {
		props: {
			product: data.product,
			error: error || null,
			user: context.user,
		},
	};
};
