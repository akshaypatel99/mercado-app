import { SimpleGrid } from '@chakra-ui/react';
import ErrorMessage from '../Message/ErrorMessage';
import ProductListItem from './ProductListItem';
import { Product, ProductsProps } from '../../pages/products';

export default function ProductList({ products, error }: ProductsProps) {
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
