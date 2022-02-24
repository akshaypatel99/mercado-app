import { useContext, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CheckoutContext } from '../context/CheckoutContext';
import { WatchListContext } from '../context/WatchListContext';
import ErrorMessage from './ErrorMessage';

export default function ProductCustomerOptions({ product, user }) {
	const {
		watchListOnOpen,
		watchListData,
		toggleUserWatchList,
		toggleWatchListLoading,
		toggleWatchListError,
	} = useContext(WatchListContext);
	const { buyNow } = useContext(CheckoutContext);

	const handleWatchList = () => {
		toggleUserWatchList(product._id);
		setTimeout(() => watchListOnOpen(), 500);
	};

	return (
		<>
			<Box>
				<Button onClick={() => buyNow(product)}>Buy Now</Button>
				<Button
					ml='4'
					onClick={handleWatchList}
					color='brand.white'
					bg='brand.500'
					_hover={{ bg: 'brand.600' }}
					_active={{ bg: 'brand.700' }}
					isLoading={toggleWatchListLoading}
				>
					{watchListData.userWatchList.some((item) => item._id === product._id)
						? 'Remove from Watch List'
						: 'Add to Watch List'}
				</Button>
			</Box>
			{toggleWatchListError && <ErrorMessage error={toggleWatchListError} />}
		</>
	);
}
