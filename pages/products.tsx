import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import ProductList from '../components/ProductList';
import { GetServerSideProps } from 'next';
import { Box, Center, Heading } from '@chakra-ui/react';

export default function Products({ products, error }) {
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
			<ProductList products={products} error={error} />
		</>
	);
}

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

	const isNewProducts = data.products.results.map((product) => ({
		...product,
		isNew: Math.random() > 0.5,
	}));

	return {
		props: {
			products: isNewProducts,
			error: error || null,
		},
	};
};
