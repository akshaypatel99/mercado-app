import { createContext, useContext, ReactNode } from 'react';
import Router from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { CURRENT_USER } from '../hooks/useUser';
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

export const WATCHLIST = gql`
	query UserWatchList {
		userWatchList {
			_id
			name
			price
			image
			isSold
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

	const {
		data: watchListData,
		loading: watchListLoading,
		error: watchListError,
	} = useQuery(WATCHLIST);

	const [
		toggleWatchList,
		{ loading: toggleWatchListLoading, error: toggleWatchListError },
	] = useMutation(TOGGLE_WATCHLIST);

	function toggleUserWatchList(id: string) {
		if (!user) {
			Router.push('/login');
		} else {
			toggleWatchList({
				variables: {
					toggleWatchListId: id,
				},
				refetchQueries: [{ query: CURRENT_USER }, { query: WATCHLIST }],
			});
		}
	}

	return (
		<WatchListContext.Provider
			value={{
				watchListIsOpen,
				watchListOnOpen,
				watchListOnClose,
				watchListData,
				watchListLoading,
				watchListError,
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
