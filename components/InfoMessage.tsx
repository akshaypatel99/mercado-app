import { Alert, AlertIcon } from '@chakra-ui/react';

export default function InfoMessage({ message }) {
	return (
		<Alert status='info' variant='subtle'>
			<AlertIcon />
			{message}
		</Alert>
	);
}
