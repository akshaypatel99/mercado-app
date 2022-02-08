import React, { useState, useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Center,
	Box,
	Button,
	Heading,
} from '@chakra-ui/react';
import { AuthContext } from '../context/auth';

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
				}
				userOrders {
					_id
				}
			}
		}
	}
`;

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = useContext(AuthContext);

	const [login, { data, loading, error, reset }] = useMutation(LOGIN);

	useEffect(() => {
		auth?.setUser(data?.login?.user);
	}, [data]);

	async function handleLogin(e: React.SyntheticEvent) {
		e.preventDefault();
		await login({
			variables: {
				input: {
					email,
					password,
				},
			},
		});
	}

	const isEmailError = email === '';
	const isPasswordError = password === '';

	return (
		<Box>
			<Center mb='16'>
				<Heading>{auth.user ? `Welcome ${auth.user.name}!` : 'Login'}</Heading>
			</Center>
			<Center mb='4'>{error && <Box>{error?.message}</Box>}</Center>
			<Center>
				<form onSubmit={handleLogin}>
					<FormControl isRequired isInvalid={isEmailError} my='4'>
						<FormLabel htmlFor='email'>Email address</FormLabel>
						<Input
							w='sm'
							id='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{!isEmailError ? (
							<FormHelperText>We'll never share your email.</FormHelperText>
						) : (
							<FormErrorMessage>Email is required.</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isRequired isInvalid={isEmailError} my='8'>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							w='sm'
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{isPasswordError && (
							<FormErrorMessage>Password is required.</FormErrorMessage>
						)}
					</FormControl>
					<Button
						type='submit'
						variant='solid'
						isLoading={loading}
						colorScheme='teal'
					>
						Login
					</Button>
				</form>
			</Center>
		</Box>
	);
}
