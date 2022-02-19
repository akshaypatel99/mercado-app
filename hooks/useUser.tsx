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
				product
				deliveryCost
				totalCost
				deliveryAddress {
					street
					city
					postcode
				}
				deliveryDate
				paymentResult {
					id
					status
					updatedAt
					emailAddress
				}
				isPaid
				paidAt
				createdAt
			}
		}
	}
`;

export function useUser() {
	const { data, loading, error } = useQuery(CURRENT_USER);

	return { data, loading, error };
}

export { CURRENT_USER };
