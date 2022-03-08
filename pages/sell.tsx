import { Center, Heading } from '@chakra-ui/react';
import CreateProduct from '../components/CreateProduct';

export default function Sell() {
	return (
		<>
			<Center>
				<Heading>Sell Your Unwanted Items</Heading>
			</Center>
			<CreateProduct />
		</>
	);
}
