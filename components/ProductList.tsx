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

export default function ProductList({ products, error }) {
	if (error) return <ErrorMessage error={error} />;

	return (
		<>
			<SimpleGrid
				minChildWidth='300px'
				spacing='60px'
				mt='8'
				justifyItems='center'
			>
				{products.map((product: Product) => (
					<ProductListItem key={product._id} product={product} />
				))}
			</SimpleGrid>
		</>
	);
}
