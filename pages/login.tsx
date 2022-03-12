import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import InfoMessage from '../components/InfoMessage';
import LoginForm from '../components/LoginForm';

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
		<>
			{message && (
				<Box mb='6'>
					<InfoMessage message={message} />
				</Box>
			)}
			<LoginForm />
		</>
	);
}
