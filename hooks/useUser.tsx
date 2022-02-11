import { gql, useQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';

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
				orderItems {
					_id
				}
				orderTotal
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
	const auth = useContext(AuthContext);

	useEffect(() => {
		if (data) {
			auth.setUser(data.currentUser);
		}
	}, [data, auth]);

	return { data, loading, error };
}

export { CURRENT_USER };