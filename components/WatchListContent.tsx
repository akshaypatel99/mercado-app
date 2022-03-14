import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useWatchList } from '../hooks/useWatchList';
import { StackDivider, VStack } from '@chakra-ui/react';
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

	if (watchListData.userWatchList.length === 0) {
		return <p>You have no items in your watch list.</p>;
	}

	let reversedWatchList = [...watchListData.userWatchList].reverse();

	return (
		<>
			{watchListData.userWatchList.length > 0 && (
				<VStack
					divider={<StackDivider borderColor='brand.300' />}
					spacing={4}
					align='stretch'
				>
					{reversedWatchList.map((product) => (
						<WatchListItem key={product._id} product={product} />
					))}
				</VStack>
			)}
		</>
	);
}
