import { Heading } from '@chakra-ui/react';
import ProductList from '../components/ProductList';

export default function Products() {
	return (
		<div>
			<Heading color='brand.teal'>All Products</Heading>
			<ProductList />
		</div>
	);
}
