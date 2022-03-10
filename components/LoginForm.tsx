import React, { useState, useContext } from 'react';
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
	Text,
	Link,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import NextLink from 'next/link';
import ErrorMessage from './ErrorMessage';

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, loginLoading, loginError, user } = useContext(AuthContext);

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
				<Heading>{user ? `Welcome ${user.name}!` : 'Login'}</Heading>
			</Center>
			<Center mb='4'>
				{loginError && <ErrorMessage error={loginError} />}
			</Center>
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
							<FormHelperText>
								We&apos;ll never share your email.
							</FormHelperText>
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
					<Button type='submit' variant='primary' isLoading={loginLoading}>
						Login
					</Button>
				</form>
			</Center>
			<Center mt='8'>
				<Text fontSize='sm' fontWeight='semibold' color='brand.500'>
					Don&apos;t have an account?{' '}
					<NextLink href='/signup' passHref>
						<Link fontWeight='bold' color='brand.green'>
							Sign up here
						</Link>
					</NextLink>
				</Text>
			</Center>
		</Box>
	);
}
