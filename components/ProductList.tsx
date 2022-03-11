import { gql, useQuery } from '@apollo/client';
import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import ProductListItem from './ProductListItem';

type Product = {
	_id: string;
	name: string;
	image: string;
	category: string;
	price: number;
	isNew: boolean;
};

// export const ALL_PRODUCTS = gql`
// 	query AllProducts($params: QueryParams) {
// 		products(params: $params) {
// 			results {
// 				_id
// 				name
// 				image
// 				category
// 				price
// 			}
// 			info {
// 				count
// 			}
// 		}
// 	}
// `;

export default function ProductList({ products, loading, error }) {
	// const { data, loading, error } = useQuery(ALL_PRODUCTS, {
	// 	variables: {
	// 		params: {
	// 			pageSize: 20,
	// 			page: 1,
	// 		},
	// 	},
	// });

	if (loading) {
		return (
			<SimpleGrid minChildWidth='350px' spacing='60px' mt='8'>
				{new Array(6).fill(0).map((_, i) => (
					<Skeleton
						key={i}
						h='484px'
						startColor='brand.300'
						endColor='brand.600'
						fadeDuration={0.8}
						borderRadius='xl'
						boxShadow='lg'
					/>
				))}
			</SimpleGrid>
		);
	}

	if (error) return <ErrorMessage error={error} />;

	return (
		<>
			<SimpleGrid minChildWidth='350px' spacing='60px' mt='8'>
				{products.map((product: Product) => (
					<ProductListItem key={product._id} product={product} />
				))}
			</SimpleGrid>
		</>
	);
}
