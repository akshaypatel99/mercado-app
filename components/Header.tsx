import { Box, Center, Container, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
	return (
		<header>
			<Container variant='header'>
				<Flex
					flexDir={['column', null, 'row', null]}
					justifyContent='space-between'
					alignItems='center'
				>
					<Heading as='h1' size='2xl' variant='light'>
						<Link href='/'>Mercado</Link>
					</Heading>
					<Nav />
				</Flex>
			</Container>
		</header>
	);
};

export default Header;
