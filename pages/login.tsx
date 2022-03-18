import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfoMessage from '../components/Message/InfoMessage';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
	const [message, setMessage] = useState('');

	useEffect(() => {
		// Check to see if this is a redirect
		const query = new URLSearchParams(window.location.search);
		if (query.get('message')) {
			setMessage(query.get('message'));
		}
	}, []);

	return (
		<Container variant='page'>
			{message && (
				<Box mb='6'>
					<InfoMessage message={message} />
				</Box>
			)}
			<LoginForm />
		</Container>
	);
}
