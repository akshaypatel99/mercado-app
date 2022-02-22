import React, { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';
import { AuthContext } from '../context/AuthContext';
import ErrorMessage from './ErrorMessage';
import WatchListItem from './WatchListItem';
import { Box } from '@chakra-ui/react';

export default function WatchListContent() {
	const { user } = useContext(AuthContext);
	const { watchListData, watchListLoading, watchListError, watchListOnClose } =
		useContext(WatchListContext);

	if (!user) {
		return <p>Please login to view your watch list.</p>;
	}

	if (!watchListData) {
		return <p>You have no items in your watch list.</p>;
	}

	if (watchListLoading) {
		return <p>Loading...</p>;
	}

	if (watchListError) {
		return <ErrorMessage error={watchListError} />;
	}

	return (
		<>
			{watchListData.userWatchList.length > 0 && (
				<Box>
					{watchListData.userWatchList.map((product) => (
						<WatchListItem key={product._id} product={product} />
					))}
				</Box>
			)}
		</>
	);
}
