import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useWatchList } from '../hooks/useWatchList';
import { Box } from '@chakra-ui/react';
import WatchListItem from './WatchListItem';
import ErrorMessage from './ErrorMessage';
import LoginRedirect from './LoginRedirect';

export default function WatchListContent() {
	const { user } = useContext(AuthContext);
	const { watchListData, watchListLoading, watchListError } = useWatchList();

	if (!user) {
		return <LoginRedirect message='view your watch list' />;
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
