import { Box, Center, Container, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
	return (
		<header>
			<Container
				maxW='container.xl'
				px={{ sm: '2rem', md: '1rem', xl: '0rem' }}
			>
				<Center>
					<Heading as='h1' size='3xl' fontFamily='logo' my='2'>
						Mercado
					</Heading>
				</Center>
				<Nav />
				<div>Search</div>
			</Container>
		</header>
	);
};

export default Header;
