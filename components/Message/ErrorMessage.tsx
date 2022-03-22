import { ApolloError } from '@apollo/client';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { StripeError } from '@stripe/stripe-js';

export default function ErrorMessage({
	error,
}: {
	error: Error | ApolloError | StripeError;
}) {
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
