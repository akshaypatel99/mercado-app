import { useContext } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { WatchlistContext } from '../../context/WatchlistReactContext';
import { useWatchlist } from '../../hooks/useWatchlistHook';
import ErrorMessage from '../Message/ErrorMessage';
import Policy from './Policy';
import { ProductType } from '../../pages/product/[id]';

export default function ProductCustomerOptions({
	product,
}: {
	product: ProductType;
}) {
	const { toggleUserWatchlist, toggleWatchlistLoading, toggleWatchlistError } =
		useContext(WatchlistContext);
	const { watchlistData } = useWatchlist();
	const { buyNow } = useContext(CheckoutContext);

	const handleWatchlist = () => {
		toggleUserWatchlist(product._id);
	};

	return (
		<>
			{toggleWatchlistError && <ErrorMessage error={toggleWatchlistError} />}
			<Box>
				<Button
					onClick={() => buyNow(product)}
					variant='primary'
					disabled={product.isSold}
				>
					Buy Now
				</Button>
				<Button
					ml='4'
					onClick={handleWatchlist}
					variant='secondary'
					isLoading={toggleWatchlistLoading}
					// Disable button if product has been sold and not already in watchlist
					// If product is in watchlist and sold, allow user to remove from watchlist
					disabled={
						product.isSold &&
						watchlistData &&
						!watchlistData.userWatchlist.some(
							(item) => item._id === product._id
						)
					}
				>
					{!watchlistData
						? 'Add to Watchlist'
						: watchlistData.userWatchlist.some(
								(item) => item._id === product._id
						  )
						? 'Remove from Watchlist'
						: 'Add to Watchlist'}
				</Button>
			</Box>
			<Policy />
		</>
	);
}
