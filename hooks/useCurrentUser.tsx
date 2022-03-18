import { gql, useQuery } from '@apollo/client';

const CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			_id
			name
			email
			role
			userProducts {
				_id
				name
				description
				image
				category
				price
			}
			userOrders {
				_id
				product {
					_id
					name
					price
				}
				subTotal
				deliveryCost
				totalCost
				deliveryAddress {
					name
					street
					city
					postcode
				}
				paymentResult {
					id
					status
					emailAddress
				}
				isPaid
				paidAt
				createdAt
			}
			userWatchlist {
				_id
			}
		}
	}
`;

export function useCurrentUser() {
	const {
		data: currentUserData,
		loading: currentUserLoading,
		error: currentUserError,
	} = useQuery(CURRENT_USER);

	return { currentUserData, currentUserLoading, currentUserError };
}

export { CURRENT_USER };
