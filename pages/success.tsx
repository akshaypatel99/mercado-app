import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Center,
	Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Success() {
	return (
		<Center>
			<Alert
				status='success'
				variant='subtle'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				height='200px'
				colorScheme='brand.green'
			>
				<AlertIcon boxSize='40px' mr={0} />
				<AlertTitle mt={4} mb={1} fontSize='lg'>
					Successful Order!
				</AlertTitle>
				<AlertDescription maxWidth='lg'>
					Your order has been placed. You will receive an email confirmation.{' '}
					<NextLink href={`/orders/`} passHref>
						<Link fontWeight='bold' color='brand.cream'>
							See your orders.
						</Link>
					</NextLink>
				</AlertDescription>
			</Alert>
		</Center>
	);
}
