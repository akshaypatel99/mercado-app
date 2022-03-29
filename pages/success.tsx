import Head from 'next/head';
import NextLink from 'next/link';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Center,
	Container,
	Link,
} from '@chakra-ui/react';
import Title from '../components/Common/Title';

export default function Success() {
	return (
		<>
			<Head>
				<title>Success | Mercado</title>
				<meta
					name='description'
					content='Mercado - buy and sell second-hand items'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					rel='icon'
					href='images/logo-light.svg'
					sizes='any'
					type='image/svg+xml'
				/>
			</Head>
			<Container variant='page'>
				<Title title='Your order has been placed!' />
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
							Thank you!
						</AlertTitle>
						<AlertDescription maxWidth='lg'>
							Your order has been placed! You will receive an email confirmation
							and your item will be dispatched shortly. <br />
							<NextLink href={`/account/orders/`} passHref>
								<Link fontWeight='bold' color='brand.8500'>
									See your orders here
								</Link>
							</NextLink>
						</AlertDescription>
					</Alert>
				</Center>
			</Container>
		</>
	);
}
