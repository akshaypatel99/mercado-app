import NextLink from 'next/link';
import { Center, Heading, Link, Text } from '@chakra-ui/react';

export default function LoginRedirect({ message }) {
	return (
		<Center flexDir='column' height='sm'>
			<Heading fontSize='xl' mb='8'>
				You must be logged in to do that
			</Heading>
			<NextLink href={`/login`} passHref>
				<Link _hover={{ color: 'brand.500' }}>
					<Text fontWeight='semibold'>Please login here to {message}.</Text>
				</Link>
			</NextLink>
		</Center>
	);
}
