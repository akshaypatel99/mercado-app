import { Alert, AlertIcon } from '@chakra-ui/react';

export default function ErrorMessage({ message }) {
	return (
		<Alert status='info' variant='subtle' colorScheme='brand.yellow'>
			<AlertIcon />
			{message}
		</Alert>
	);
}
