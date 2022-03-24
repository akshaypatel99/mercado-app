import { SimpleGrid } from '@chakra-ui/react';
import ErrorMessage from '../Message/ErrorMessage';
import ProductListItem from './ProductListItem';
import { Product, ProductsProps } from '../../pages/products';

export default function ProductList({ products, error }: ProductsProps) {
	if (error) return <ErrorMessage error={error} />;

	// Sort products by isSold (sold last)
	products.sort((a, b) => {
		// sort b before a
		if (a.isSold && !b.isSold) return 1;
		// sort a before b
		if (!a.isSold && b.isSold) return -1;

		if (a.isNew && !b.isNew) return -1;
		if (!a.isNew && b.isNew) return 1;

		// a === b, keep order
		return 0;
	});

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
