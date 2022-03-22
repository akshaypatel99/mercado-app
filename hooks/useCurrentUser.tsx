import { gql, useQuery } from '@apollo/client';
import { User } from '../context/AuthContext';

const CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			_id
			name
			email
			role
		}
	}
`;

export function useCurrentUser() {
	const {
		data: currentUserData,
		loading: currentUserLoading,
		error: currentUserError,
	} = useQuery<{ currentUser: User }>(CURRENT_USER);

	return { currentUserData, currentUserLoading, currentUserError };
}

export { CURRENT_USER };
