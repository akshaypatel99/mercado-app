import { Box, Text } from '@chakra-ui/react';
import Router from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackLink() {
	return (
		<>
			<Box
				as='button'
				fontSize='md'
				color='brand.500'
				fontWeight='semibold'
				display='inline-flex'
				w='max-content'
				alignItems='center'
				_hover={{ textDecoration: 'none', color: 'brand.750' }}
				_focus={{ boxShadow: 'none', color: 'brand.750' }}
				onClick={() => Router.back()}
			>
				<FiArrowLeft /> <Text ml='1'>Back</Text>
			</Box>
		</>
	);
}
