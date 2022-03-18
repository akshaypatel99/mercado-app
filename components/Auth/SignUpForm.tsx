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
	Text,
	Link,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import NextLink from 'next/link';
import ErrorMessage from '../Message/ErrorMessage';
import Title from '../Common/Title';

export default function SignUpForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user, signup, signupLoading, signupError } = useContext(AuthContext);

	async function handleSignup(e: React.SyntheticEvent) {
		e.preventDefault();
		await signup({
			variables: {
				input: {
					name,
					email,
					password,
				},
			},
		});
	}

	const isNameError = name === '';
	const isEmailError = email === '';
	const isPasswordError = password === '';

	return (
		<Box>
			<Title title={user ? `Welcome ${user.name}!` : 'Sign Up'} />
			<Center mb='4'>
				{signupError && <ErrorMessage error={signupError} />}
			</Center>
			<Center>
				<form onSubmit={handleSignup}>
					<FormControl isRequired isInvalid={isNameError} my='4'>
						<FormLabel htmlFor='name'>Full name</FormLabel>
						<Input
							w='sm'
							id='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{isEmailError && (
							<FormErrorMessage>Full name is required.</FormErrorMessage>
						)}
					</FormControl>
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
								We`&apos`ll never share your email.
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
					<Button type='submit' variant='primary' isLoading={signupLoading}>
						Sign Up
					</Button>
				</form>
			</Center>
			<Center mt='8'>
				<Text fontSize='sm' fontWeight='semibold' color='brand.500'>
					Already have an account?{' '}
					<NextLink href='/login' passHref>
						<Link fontWeight='bold' color='brand.green'>
							Log in here
						</Link>
					</NextLink>
				</Text>
			</Center>
		</Box>
	);
}
