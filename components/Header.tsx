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
				<Box display='flex' justifyContent='space-between' alignItems='center'>
					<Heading as='h1' size='2xl' fontFamily='heading' my='2'>
						<Link href='/products'>Mercado</Link>
					</Heading>
					<Nav />
				</Box>
			</Container>
		</header>
	);
};

export default Header;
