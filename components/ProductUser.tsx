import { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Alert, AlertIcon, Box, Button } from '@chakra-ui/react';
import { WatchListContext } from '../context/WatchListContext';

const TOGGLE_WATCHLIST = gql`
	mutation ToggleWatchList($toggleWatchListId: ID!) {
		toggleWatchList(id: $toggleWatchListId) {
			message
			user {
				_id
				userWatchList {
					_id
				}
			}
		}
	}
`;

export default function ProductUser({ product, user }) {
	const [watchList, setWatchList] = useState<Boolean>(
		user.userWatchList.includes(product._id)
	);
	const { watchListOnOpen } = useContext(WatchListContext);
	const [toggleWatchList, { loading, error }] = useMutation(TOGGLE_WATCHLIST, {
		variables: {
			toggleWatchListId: product._id,
		},
	});
	const handlePurchase = () => {};
	const handleWatchList = () => {
		setWatchList(!watchList);
		toggleWatchList();
		watchListOnOpen();
	};

	return (
		<>
			<Box>
				<Button onClick={handlePurchase}>Buy Now</Button>
				<Button
					ml='4'
					onClick={handleWatchList}
					color='brand.white'
					bg='brand.500'
					_hover={{ bg: 'brand.600' }}
					_active={{ bg: 'brand.700' }}
					isLoading={loading}
				>
					{watchList ? 'Remove from Watch List' : 'Add to Watch List'}
				</Button>
			</Box>
			{error && (
				<Alert status='error' variant='subtle'>
					<AlertIcon />
					{error.message}
				</Alert>
			)}
		</>
	);
}
