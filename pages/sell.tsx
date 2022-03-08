import { Center, Heading } from '@chakra-ui/react';
import CreateProduct from '../components/CreateProduct';

export default function Sell() {
	return (
		<>
			<Center>
				<Heading color='brand.teal'>Sell Your Unwanted Items</Heading>
			</Center>
			<CreateProduct />
		</>
	);
}
