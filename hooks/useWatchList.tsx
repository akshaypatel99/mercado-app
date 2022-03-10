import { gql, useQuery } from '@apollo/client';

const WATCHLIST = gql`
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

export function useWatchList() {
	const {
		data: watchListData,
		loading: watchListLoading,
		error: watchListError,
	} = useQuery(WATCHLIST);

	return { watchListData, watchListLoading, watchListError };
}

export { WATCHLIST };
