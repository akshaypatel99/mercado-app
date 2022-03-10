import { useContext } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CheckoutContext } from '../context/CheckoutContext';
import { WatchListContext } from '../context/WatchListContext';
import ErrorMessage from './ErrorMessage';

export default function ProductCustomerOptions({ product, user }) {
	const {
		watchListData,
		toggleUserWatchList,
		toggleWatchListLoading,
		toggleWatchListError,
	} = useContext(WatchListContext);
	const { buyNow } = useContext(CheckoutContext);

	const handleWatchList = () => {
		toggleUserWatchList(product._id);
	};

	return (
		<>
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
			{toggleWatchListError && <ErrorMessage error={toggleWatchListError} />}
		</>
	);
}
