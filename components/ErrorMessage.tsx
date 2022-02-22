import { Alert, AlertIcon } from '@chakra-ui/react';

export default function ErrorMessage({ error }) {
	return (
		<Alert status='error' variant='subtle'>
			<AlertIcon />
			{error.message}
		</Alert>
	);
}
