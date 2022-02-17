import { Box, Button } from '@chakra-ui/react';

export default function ProductUser({ product }) {
	const handlePurchase = () => {};
	const handleWatchList = () => {};

	return (
		<Box>
			<Button onClick={handlePurchase}>Buy Now</Button>
			<Button onClick={handleWatchList}>Add to Wish List</Button>
		</Box>
	);
}
