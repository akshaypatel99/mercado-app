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
import InfoMessage from '../Message/InfoMessage';

type SignupFormState = {
	name: string;
	email: string;
	password: string;
};

export default function SignUpForm() {
	const [formData, setFormData] = useState<SignupFormState>({
		name: '',
		email: '',
		password: '',
	});
	const { user, signupUser, signupLoading, signupError, alertMessage } =
		useContext(AuthContext);

	async function handleSignup(e: React.SyntheticEvent) {
		e.preventDefault();
		signupUser(formData);
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const isNameError = formData.name === '';
	const isEmailError = formData.email === '';
	const isPasswordError = formData.password === '';

	return (
		<Box>
			<Title title={user ? `Welcome ${user.name}!` : 'Sign Up'} />
			<Center mb='4'>
				{signupError && <ErrorMessage error={signupError} />}
				{alertMessage && <InfoMessage message={alertMessage} />}
			</Center>
			<Center>
				<form onSubmit={handleSignup}>
					<FormControl isRequired isInvalid={isNameError} my='4'>
						<FormLabel htmlFor='name'>Full name</FormLabel>
						<Input
							w='sm'
							id='name'
							type='text'
							value={formData.name}
							onChange={onInputChange}
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
							value={formData.email}
							onChange={onInputChange}
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
							value={formData.password}
							onChange={onInputChange}
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
