import { useContext } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CheckoutContext } from '../context/CheckoutContext';
import { WatchListContext } from '../context/WatchListContext';
import { useWatchList } from '../hooks/useWatchList';
import ErrorMessage from './ErrorMessage';
import Policy from './Policy';

export default function ProductCustomerOptions({ product }) {
	const { toggleUserWatchList, toggleWatchListLoading, toggleWatchListError } =
		useContext(WatchListContext);
	const { watchListData } = useWatchList();
	const { buyNow } = useContext(CheckoutContext);

	const handleWatchList = () => {
		toggleUserWatchList(product._id);
	};

	return (
		<>
			{toggleWatchListError && <ErrorMessage error={toggleWatchListError} />}
			<Box>
				<Button onClick={() => buyNow(product)} variant='primary'>
					Buy Now
				</Button>
				<Button
					ml='4'
					onClick={handleWatchList}
					variant='secondary'
					isLoading={toggleWatchListLoading}
				>
					{!watchListData
						? 'Add to Watch List'
						: watchListData.userWatchList.some(
								(item) => item._id === product._id
						  )
						? 'Remove from Watch List'
						: 'Add to Watch List'}
				</Button>
			</Box>
			<Policy />
		</>
	);
}
