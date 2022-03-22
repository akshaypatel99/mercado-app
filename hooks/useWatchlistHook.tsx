import { gql, useQuery } from '@apollo/client';

const WATCHLIST = gql`
	query UserWatchlist {
		userWatchlist {
			_id
			name
			price
			image
			isSold
		}
	}
`;

type WatchlistType = {
	userWatchlist: {
		_id: string;
		name: string;
		price: number;
		image: string;
		isSold: boolean;
	}[];
};

export function useWatchlist() {
	const {
		data: watchlistData,
		loading: watchlistLoading,
		error: watchlistError,
	} = useQuery<WatchlistType>(WATCHLIST);

	return { watchlistData, watchlistLoading, watchlistError };
}

export { WATCHLIST };
