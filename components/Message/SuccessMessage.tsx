import { Alert, AlertIcon } from '@chakra-ui/react';

export default function SuccessMessage({ message }) {
	return (
		<Alert status='success' variant='subtle' justifyContent='center'>
			<AlertIcon />
			{message}
		</Alert>
	);
}
