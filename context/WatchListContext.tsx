import { useDisclosure } from '@chakra-ui/react';
import { createContext, useEffect, ReactNode, useReducer } from 'react';

const WatchListContext = createContext(null);

const WatchListProvider = ({ children }: { children: ReactNode }) => {
	const {
		isOpen: watchListIsOpen,
		onOpen: watchListOnOpen,
		onClose: watchListOnClose,
	} = useDisclosure();
	const [watchListState, watchListDispatch] = useReducer(watchListReducer, {
		watchList: [],
	});

	function watchListReducer(state, action) {
		switch (action.type) {
			case 'ADD':
				return { watchList: [...state.watchList, action.payload] };
			case 'REMOVE':
				return {
					watchList: state.watchList.filter(
						(item) => item._id !== action.payload
					),
				};
			case 'EMPTY':
				return { watchList: [] };
			default:
				return state;
		}
	}

	return (
		<WatchListContext.Provider
			value={{
				watchListIsOpen,
				watchListOnOpen,
				watchListOnClose,
				watchListState,
				watchListDispatch,
			}}
		>
			{children}
		</WatchListContext.Provider>
	);
};

export { WatchListContext, WatchListProvider };
