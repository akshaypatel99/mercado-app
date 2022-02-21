import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from './Header';
import WatchList from './WatchList';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<Box>
			<Header />
			<Container
				maxW='container.xl'
				my='16'
				p={{ sm: '2rem', md: '1rem', lg: '1rem' }}
			>
				<WatchList />
				{children}
			</Container>
		</Box>
	);
};

export default Page;
