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

export function useWatchlist() {
	const {
		data: watchlistData,
		loading: watchlistLoading,
		error: watchlistError,
	} = useQuery(WATCHLIST);

	return { watchlistData, watchlistLoading, watchlistError };
}

export { WATCHLIST };
