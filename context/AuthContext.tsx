import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import { useCurrentUser } from '../hooks/useCurrentUser';

const SIGN_UP = gql`
	mutation SignUp($input: SignupInput) {
		signup(input: $input) {
			message
			user {
				_id
				name
				email
				role
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
			}
		}
	}
`;

const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

export type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
};

type LoginInput = {
	email: string;
	password: string;
};

type SignupInput = {
	name: string;
	email: string;
	password: string;
};

type AuthMutationResult = {
	message: string;
	user: User;
};

type AuthContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	signupUser: (input: SignupInput) => void;
	signupLoading: boolean;
	signupError: ApolloError | undefined;
	loginUser: (input: LoginInput) => void;
	loginLoading: boolean;
	loginError: ApolloError | undefined;
	logoutUser: () => void;
	alertMessage: string | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [
		signup,
		{ data: signupUserData, loading: signupLoading, error: signupError },
	] = useMutation<{ signup: AuthMutationResult }, { input: SignupInput }>(
		SIGN_UP
	);
	const [
		login,
		{ data: loginUserData, loading: loginLoading, error: loginError },
	] = useMutation<{ login: AuthMutationResult }, { input: LoginInput }>(LOGIN);
	const [logout, { reset: logoutReset }] =
		useMutation<{ logout: boolean }>(LOGOUT);
	const { currentUserData, currentUserLoading, currentUserError } =
		useCurrentUser();

	useEffect(() => {
		if (signupUserData) {
			setUser(signupUserData.signup.user);
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

	const loginUser = async (formData: LoginInput) => {
		if (user) {
			setAlertMessage('You are already logged in, please logout first');
			return;
		}
		await login({ variables: { input: { ...formData } } });
	};

	const signupUser = async (formData: SignupInput) => {
		if (user) {
			setAlertMessage('You are already logged in, please logout first');
			return;
		}
		await signup({ variables: { input: { ...formData } } });
	};

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
				signupUser,
				signupLoading,
				signupError,
				loginUser,
				loginLoading,
				loginError,
				logoutUser,
				alertMessage,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
