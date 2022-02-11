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
import { AuthContext } from '../context/auth';
import NextLink from 'next/link';

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

export default function SignUpForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = useContext(AuthContext);

	const [signup, { data, loading, error, reset }] = useMutation(SIGN_UP);

	useEffect(() => {
		auth?.setUser(data?.signup?.user);
	}, [data, auth]);

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
			<Center mb='16'>
				<Heading>
					{auth.user ? `Welcome ${auth.user.name}!` : 'Sign Up'}
				</Heading>
			</Center>
			<Center mb='4'>{error && <Box>{error?.message}</Box>}</Center>
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
					<Button
						type='submit'
						variant='solid'
						isLoading={loading}
						colorScheme='teal'
					>
						Sign Up
					</Button>
				</form>
			</Center>
			<Center mt='8'>
				<Text fontSize='sm' fontWeight='semibold' color='brand.700'>
					Already have an account?{' '}
					<NextLink href='/login' passHref>
						<Link fontWeight='bold' color='brand.800'>
							Log in here
						</Link>
					</NextLink>
				</Text>
			</Center>
		</Box>
	);
}
