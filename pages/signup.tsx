import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import SignUpForm from '../components/Auth/SignUpForm';

export default function SignUp() {
	return (
		<>
			<Head>
				<title>Sign Up | Mercado</title>
				<meta
					name='description'
					content='Mercado - buy and sell second-hand items'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					rel='icon'
					href='images/logo-light.svg'
					sizes='any'
					type='image/svg+xml'
				/>
			</Head>
			<Container variant='page'>
				<SignUpForm />
			</Container>
		</>
	);
}
