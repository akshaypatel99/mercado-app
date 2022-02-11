import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { gql, useMutation } from '@apollo/client';

import { useUser } from '../hooks/useUser';

type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	userProducts: object[];
	userOrders: string[];
};

interface AuthContextInterface {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
	logout: () => void;
}

const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

const AuthContext = createContext(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState();
	const [logout, { reset }] = useMutation(LOGOUT);
	const { data } = useUser();

	useEffect(() => {
		if (data) {
			setUser(data.currentUser);
		}
	}, [data]);

	const logoutUser = () => {
		try {
			logout();
			setUser(null);
		} catch (error) {
			reset();
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				logoutUser,
				greeting: 'hello',
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
