import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
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

	const userRedirect = () => {
		if (!user) {
			return Router.push('/login');
		}
		return;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				logoutUser,
				userRedirect,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
