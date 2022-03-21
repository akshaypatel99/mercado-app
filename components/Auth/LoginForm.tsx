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
	Text,
	Link,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import NextLink from 'next/link';
import ErrorMessage from '../Message/ErrorMessage';
import Title from '../Common/Title';

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { login, loginLoading, loginError, user } = useContext(AuthContext);

	async function handleLogin(e: React.SyntheticEvent) {
		e.preventDefault();
		await login({
			variables: {
				input: {
					...formData,
				},
			},
		});
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const isEmailError = formData.email === '';
	const isPasswordError = formData.password === '';

	return (
		<Box>
			<Title title={user ? `Welcome ${user.name}!` : 'Login'} />
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
							name='email'
							value={formData.email}
							onChange={onInputChange}
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
							name='password'
							value={formData.password}
							onChange={onInputChange}
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
