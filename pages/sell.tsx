import { Center, Heading } from '@chakra-ui/react';
import CreateProduct from '../components/CreateProduct';

export default function Sell() {
	return (
		<>
			<Center mb='8'>
				<Heading>Sell Your Unwanted Items</Heading>
			</Center>
			<CreateProduct />
		</>
	);
}
