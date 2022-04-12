import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloError } from 'apollo-server-micro';
import { Container } from '@chakra-ui/react';
import client from '../../lib/apollo-client';
import checkUser from '../../lib/checkUser';
import Product from '../../components/Product/Product';
import ErrorMessage from '../../components/Message/ErrorMessage';
import BackLink from '../../components/Common/BackLink';

export default function ProductPage({
	product,
	error,
	user,
}: ProductPageProps) {
	return (
		<>
			<Head>
				<title>{product.name} | Mercado</title>
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
				<BackLink />
				{error && <ErrorMessage error={error} />}
				<Product product={product} user={user} />
			</Container>
		</>
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
		fetchPolicy: 'network-only',
	});

	return {
		props: {
			product: data.product,
			error: error || null,
			user,
		},
	};
};
