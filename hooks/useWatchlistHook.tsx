import { gql, useQuery } from '@apollo/client';
import { ProductType } from '../pages/product/[id]';

const WATCHLIST = gql`
	query UserWatchlist {
		userWatchlist {
			_id
			name
			description
			image
			category
			price
			user {
				_id
				name
			}
			watchedBy {
				_id
			}
			isSold
		}
	}
`;

type WatchlistType = {
	userWatchlist: ProductType[];
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
