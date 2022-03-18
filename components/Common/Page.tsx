import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import Watchlist from '../Watchlist/WatchlistDrawer';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<Box>
			<Header />
			{/* <Container
				maxW='container.xl'
				my='8'
				p={{ sm: '2rem', md: '1rem', lg: '1rem' }}
			> */}
			<Watchlist />
			{children}
			{/* </Container> */}
		</Box>
	);
};

export default Page;