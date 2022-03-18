import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Watchlist from '../Watchlist/WatchlistDrawer';

type PageProps = { children: ReactNode };

const Page = ({ children }: PageProps, { ...props }) => {
	return (
		<Box>
			<Header />
			<Watchlist />
			{children}
		</Box>
	);
};

export default Page;
