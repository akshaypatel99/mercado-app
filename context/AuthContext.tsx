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
import { useCurrentUser } from '../hooks/useCurrentUser';

type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	userProducts: object[];
	userOrders: string[];
	userWatchList: object[];
};

interface AuthContextInterface {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
	logout: () => void;
}

const SIGN_UP = gql`
	mutation SignUp($input: SignupInput) {
		signup(input: $input) {
			message
			user {
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
	}
`;

const LOGIN = gql`
	mutation Login($input: LoginInput) {
		login(input: $input) {
			message
			user {
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
	}
`;

const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

const AuthContext = createContext(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState();
	const [
		signup,
		{ data: signupUserData, loading: signupLoading, error: signupError },
	] = useMutation(SIGN_UP);
	const [
		login,
		{ data: loginUserData, loading: loginLoading, error: loginError },
	] = useMutation(LOGIN);
	const [logout, { reset: logoutReset }] = useMutation(LOGOUT);
	const { currentUserData, currentUserLoading, currentUserError } =
		useCurrentUser();

	useEffect(() => {
		if (signupUserData) {
			setUser(loginUserData.signup.user);
			setTimeout(() => Router.push('/products'), 2000);
		}
		if (loginUserData) {
			setUser(loginUserData.login.user);
			setTimeout(() => Router.push('/products'), 2000);
		}
		if (currentUserData) {
			setUser(currentUserData.currentUser);
		}
	}, [currentUserData, loginUserData, signupUserData]);

	const logoutUser = () => {
		try {
			logout();
			setUser(null);
			Router.push('/products');
		} catch (error) {
			logoutReset();
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
				signup,
				signupLoading,
				signupError,
				login,
				loginLoading,
				loginError,
				logoutUser,
				userRedirect,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
