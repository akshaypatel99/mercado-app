import { Heading } from '@chakra-ui/react';
import ProductList from '../components/ProductList';

export default function Products() {
	return (
		<div>
			<Heading color='brand.600'>All Products</Heading>
			<ProductList />
		</div>
	);
}
