import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import Product from '../../components/Product/Product';
import checkUser from '../../lib/checkUser';
import { GetServerSideProps } from 'next';
import ErrorMessage from '../../components/Message/ErrorMessage';
import BackLink from '../../components/Common/BackLink';
import { Container } from '@chakra-ui/react';
import { ApolloError } from 'apollo-server-micro';
import { ParsedUrlQuery } from 'querystring';

export default function ProductPage({
	product,
	error,
	user,
}: ProductPageProps) {
	return (
		<Container variant='page'>
			<BackLink />
			{error && <ErrorMessage error={error} />}
			<Product product={product} user={user} />
		</Container>
	);
}

export type ProductType = {
	_id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
	user: {
		_id: string;
		name: string;
	};
	watchedBy: {
		_id: string;
	}[];
	isSold: boolean;
};

export type ProductProps = {
	product: ProductType;
	user: {
		_id: string;
		role: string;
	} | null;
};

type ProductPageProps = ProductProps & { error: ApolloError | null };

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = await checkUser(context, {
		level: 'USER',
		redirect: false,
	});

	const id = context.params?.id;

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
			user,
		},
	};
};
