import { Box, Center, Container, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
	return (
		<header>
			<Container
				maxW='container.xl'
				px={['2rem', '1rem', '0.5rem', '0rem']}
				py={['0.5rem', '0rem', null, null]}
			>
				<Flex
					flexDir={['column', null, 'row', null]}
					justifyContent='space-between'
					alignItems='center'
				>
					<Heading as='h1' size='2xl' variant='light'>
						<Link href='/products'>Mercado</Link>
					</Heading>
					<Nav />
				</Flex>
			</Container>
		</header>
	);
};

export default Header;
