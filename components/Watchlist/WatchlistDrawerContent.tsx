import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useWatchlist } from '../../hooks/useWatchlistHook';
import { StackDivider, VStack } from '@chakra-ui/react';
import WatchlistItem from './WatchlistDrawerItem';
import ErrorMessage from '../Message/ErrorMessage';
import LoginRedirect from '../Common/LoginRedirect';

export default function WatchlistContent() {
	const { user } = useContext(AuthContext);
	const { watchlistData, watchlistLoading, watchlistError } = useWatchlist();

	if (!user) {
		return <LoginRedirect message='view your watchlist' />;
	}

	if (!watchlistData) {
		return <p>You have no items in your watchlist.</p>;
	}

	if (watchlistLoading) {
		return <p>Loading...</p>;
	}

	if (watchlistError) {
		return <ErrorMessage error={watchlistError} />;
	}

	if (watchlistData.userWatchlist.length === 0) {
		return <p>You have no items in your watchlist.</p>;
	}

	let reversedWatchlist = [...watchlistData.userWatchlist].reverse();

	return (
		<>
			{watchlistData.userWatchlist.length > 0 && (
				<VStack
					divider={<StackDivider borderColor='brand.300' />}
					spacing={4}
					align='stretch'
				>
					{reversedWatchlist.map((product) => (
						<WatchlistItem key={product._id} product={product} />
					))}
				</VStack>
			)}
		</>
	);
}
