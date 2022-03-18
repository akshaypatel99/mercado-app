import { createContext, useContext, ReactNode } from 'react';
import Router from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER } from '../hooks/useCurrentUser';
import { WATCHLIST } from '../hooks/useWatchlist';
import { AuthContext } from './AuthContext';

const TOGGLE_WATCHLIST = gql`
	mutation ToggleWatchlist($toggleWatchlistId: ID!) {
		toggleWatchlist(id: $toggleWatchlistId) {
			message
			user {
				_id
				userWatchlist {
					_id
					name
					image
					price
					isSold
				}
			}
		}
	}
`;

const WatchlistContext = createContext(null);

const WatchlistProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useContext(AuthContext);

	const {
		isOpen: watchlistIsOpen,
		onOpen: watchlistOnOpen,
		onClose: watchlistOnClose,
	} = useDisclosure();

	const [
		toggleWatchlist,
		{ loading: toggleWatchlistLoading, error: toggleWatchlistError },
	] = useMutation(TOGGLE_WATCHLIST);

	function toggleUserWatchlist(id: string) {
		if (!user) {
			Router.push(
				'/login?message=Please login or signup to add to your watchlist'
			);
		} else {
			toggleWatchlist({
				variables: {
					toggleWatchlistId: id,
				},
				refetchQueries: [{ query: CURRENT_USER }, { query: WATCHLIST }],
			});
			setTimeout(() => watchlistOnOpen(), 500);
		}
	}

	return (
		<WatchlistContext.Provider
			value={{
				watchlistIsOpen,
				watchlistOnOpen,
				watchlistOnClose,
				toggleUserWatchlist,
				toggleWatchlistLoading,
				toggleWatchlistError,
			}}
		>
			{children}
		</WatchlistContext.Provider>
	);
};

export { WatchlistContext, WatchlistProvider };
