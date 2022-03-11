import { Box, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackTo({ text, href }: { text: string; href: string }) {
	return (
		<>
			<NextLink href={`/${href}`} passHref>
				<Link
					_hover={{ textDecoration: 'none' }}
					_focus={{ boxShadow: 'none' }}
				>
					<Box
						fontSize='md'
						color='brand.500'
						fontWeight='semibold'
						display='flex'
						alignItems='center'
						_hover={{ textDecoration: 'none', color: 'brand.750' }}
						_focus={{ boxShadow: 'none', color: 'brand.750' }}
					>
						<FiArrowLeft /> <Text ml='1'>{`Back to ${text}`}</Text>
					</Box>
				</Link>
			</NextLink>
		</>
	);
}
