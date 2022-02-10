import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
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

// const AuthContext = createContext<AuthContextInterface>({
// 	user: {
// 		_id: '',
// 		name: '',
// 		email: '',
// 		role: '',
// 		userProducts: [],
// 		userOrders: [],
// 	},
// 	setUser: () => {},
// 	logout: () => {},
// });

const AuthContext = createContext(null);

const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState();
	// const { data, loading, error } = useUser();

	// console.log('AuthContext data', data?.currentUser);

	// useEffect(() => {
	// 	if (data) {
	// 		setUser(data.currentUser);
	// 	}
	// 	if (error) {
	// 		setUser({});
	// 	}
	// }, [data, error]);

	// const logout = () => {
	// 	try {
	// 		setUser(null);
	// 	} catch (error) {
	// 		return error;
	// 	}
	// };

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				// logout,
				greeting: 'hello',
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
