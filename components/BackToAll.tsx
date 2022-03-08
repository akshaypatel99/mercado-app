import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackToAll() {
	return (
		<>
			<NextLink href='/products' passHref>
				<Link _hover={{ textDecoration: 'none' }}>
					<Box
						mb='4'
						fontSize='md'
						color='brand.teal'
						fontWeight='semibold'
						display='flex'
						alignItems='center'
						_hover={{ textDecoration: 'none' }}
					>
						<FiArrowLeft /> <Text ml='1'>Back to all products</Text>
					</Box>
				</Link>
			</NextLink>
		</>
	);
}
