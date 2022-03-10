import { Heading } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import Title from '../components/Title';

export default function Products() {
	return (
		<>
			<Title title='Find your next best bargain today...' />
			<ProductList />
		</>
	);
}
