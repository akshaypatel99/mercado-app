import { Box, Button } from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';

export default function ProductAdminOptions({ product }) {
	return (
		<>
			<Box mb='6'>
				<Button disabled={!product.isSold} onClick={() => {}} variant='primary'>
					Return to sale
				</Button>
				<Button ml='4' onClick={() => {}} variant='negative'>
					Delete product
				</Button>
			</Box>
		</>
	);
}
