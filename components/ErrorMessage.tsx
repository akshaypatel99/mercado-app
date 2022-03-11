import { Alert, AlertIcon } from '@chakra-ui/react';

export default function ErrorMessage({ error }) {
	return (
		<Alert
			status='error'
			variant='subtle'
			colorScheme='brand.red'
			justifyContent='center'
		>
			<AlertIcon />
			{error.message}
		</Alert>
	);
}
