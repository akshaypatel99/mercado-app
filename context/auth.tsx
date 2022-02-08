import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';

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
}

const AuthContext = createContext<AuthContextInterface>({
	user: {
		_id: '',
		name: '',
		email: '',
		role: '',
		userProducts: [],
		userOrders: [],
	},
	setUser: () => {},
});

const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User>();

	return (
		<Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
