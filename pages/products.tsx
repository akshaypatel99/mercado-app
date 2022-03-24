import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import ProductList from '../components/Product/ProductList';
import { GetServerSideProps } from 'next';
import { Box, Center, Container, Heading } from '@chakra-ui/react';
import { ApolloError } from 'apollo-server-micro';

export default function Products({ products, error }: ProductsProps) {
	return (
		<>
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
					bgColor='rgba(20, 74, 94, 0.4)'
					backdropBlur='1px'
					textAlign='center'
				>
					<Heading variant='light' textTransform='uppercase' fontSize='2.5rem'>
						Find{' '}
						<span
							style={{
								color: '#17C3B2',
							}}
						>
							your
						</span>{' '}
						next bargain today...
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
					}
					info {
						count
					}
				}
			}
		`,
		variables: {
			params: {
				pageSize: 20,
				page: 1,
			},
		},
	});

	const isNewProducts: Product[] = data.products.results.map(
		(product: QueryProduct) => ({
			...product,
			isNew: Math.random() > 0.5,
		})
	);

	return {
		props: {
			products: isNewProducts,
			error: error || null,
		},
	};
};
