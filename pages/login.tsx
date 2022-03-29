import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';
import InfoMessage from '../components/Message/InfoMessage';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
	const [message, setMessage] = useState<string | null>('');

	useEffect(() => {
		// Check to see if this is a redirect
		const query = new URLSearchParams(window.location.search);
		if (query.get('message')) {
			setMessage(query.get('message'));
		}
	}, []);

	return (
		<>
			<Head>
				<title>Login | Mercado</title>
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
				{message && (
					<Box mb='6'>
						<InfoMessage message={message} />
					</Box>
				)}
				<LoginForm />
			</Container>
		</>
	);
}
