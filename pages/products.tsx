import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { gql } from '@apollo/client';
import { ApolloError } from 'apollo-server-micro';
import { Box, Center, Container, Heading } from '@chakra-ui/react';
import client from '../lib/apollo-client';
import ProductList from '../components/Product/ProductList';
import { isProductCreatedWithin30Days } from '../lib/localDate';

export default function Products({ products, error }: ProductsProps) {
	return (
		<>
			<Head>
				<title>All Products | Mercado</title>
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
			<Box
				as='section'
				w='100%'
				h='200px'
				backgroundImage={`url('/images/all-products.jpeg')`}
				backgroundPosition='center'
				backgroundRepeat='no-repeat'
				backgroundSize='cover'
				boxShadow='md'
			>
				<Center
					boxSize='full'
					backdropFilter='auto'
					backdropContrast='80%'
					// bgColor='rgba(20, 74, 94, 0.3)'
					bgColor='rgba(78, 150, 177, 0.4)'
					backdropBlur='2px'
					textAlign='center'
				>
					<Heading variant='light' textTransform='uppercase' fontSize='2.5rem'>
						Find your next bargain today...
					</Heading>
				</Center>
			</Box>
			<Container variant='page'>
				<ProductList products={products} error={error} />
			</Container>
		</>
	);
}

export type QueryProduct = {
	_id: string;
	name: string;
	image: string;
	category: string;
	price: number;
	isSold: boolean;
	createdAt: Date;
};

export type Product = QueryProduct & {
	isNew: boolean;
};

export type ProductsProps = {
	products: Product[];
	error: ApolloError | null;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const { data, error } = await client.query({
		query: gql`
			query AllProducts($params: QueryParams) {
				products(params: $params) {
					results {
						_id
						name
						image
						category
						price
						isSold
						createdAt
					}
					info {
						count
					}
				}
			}
		`,
		variables: {
			params: {
				pageSize: 50,
				page: 1,
			},
		},
	});

	const isNewProducts: Product[] = data.products.results.map(
		(product: QueryProduct) => ({
			...product,
			isNew: isProductCreatedWithin30Days(product.createdAt)
				? true
				: Math.random() > 0.25,
		})
	);

	return {
		props: {
			products: isNewProducts,
			error: error || null,
		},
	};
};
