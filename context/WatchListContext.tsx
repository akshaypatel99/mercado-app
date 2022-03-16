import { createContext, useContext, ReactNode } from 'react';
import Router from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER } from '../hooks/useCurrentUser';
import { WATCHLIST } from '../hooks/useWatchList';
import { AuthContext } from './AuthContext';

const TOGGLE_WATCHLIST = gql`
	mutation ToggleWatchList($toggleWatchListId: ID!) {
		toggleWatchList(id: $toggleWatchListId) {
			message
			user {
				_id
				userWatchList {
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

const WatchListContext = createContext(null);

const WatchListProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useContext(AuthContext);

	const {
		isOpen: watchListIsOpen,
		onOpen: watchListOnOpen,
		onClose: watchListOnClose,
	} = useDisclosure();

	const [
		toggleWatchList,
		{ loading: toggleWatchListLoading, error: toggleWatchListError },
	] = useMutation(TOGGLE_WATCHLIST);

	function toggleUserWatchList(id: string) {
		if (!user) {
			Router.push(
				'/login?message=Please login or signup to add to your watchlist'
			);
		} else {
			toggleWatchList({
				variables: {
					toggleWatchListId: id,
				},
				refetchQueries: [{ query: CURRENT_USER }, { query: WATCHLIST }],
			});
			setTimeout(() => watchListOnOpen(), 500);
		}
	}

	return (
		<WatchListContext.Provider
			value={{
				watchListIsOpen,
				watchListOnOpen,
				watchListOnClose,
				toggleUserWatchList,
				toggleWatchListLoading,
				toggleWatchListError,
			}}
		>
			{children}
		</WatchListContext.Provider>
	);
};

export { WatchListContext, WatchListProvider };
