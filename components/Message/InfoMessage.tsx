import { Alert, AlertIcon } from '@chakra-ui/react';

export default function InfoMessage({ message }) {
	return (
		<Alert
			status='info'
			variant='subtle'
			bg='brand.150'
			justifyContent='center'
		>
			<AlertIcon color='brand.500' />
			{message}
		</Alert>
	);
}
