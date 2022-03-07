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
			userWatchList {
				_id
			}
		}
	}
`;

export function useUser() {
	const { data, loading, error } = useQuery(CURRENT_USER);

	return { data, loading, error };
}

export { CURRENT_USER };
