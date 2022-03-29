import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import CheckoutItem from '../components/Product/CheckoutItem';
import InfoMessage from '../components/Message/InfoMessage';
import BackTo from '../components/Common/BackTo';
import Title from '../components/Common/Title';

type CancelStateType = {
	isCancelled: boolean;
	message: string;
};

export default function Checkout() {
	const [cancel, setCancel] = useState<CancelStateType>({
		isCancelled: false,
		message: '',
	});

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get('canceled')) {
			setCancel({
				isCancelled: true,
				message:
					'Order canceled - please continue to shop around and checkout when you’re ready.',
			});
		}
	}, []);

	return (
		<>
			<Head>
				<title>Checkout | Mercado</title>
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
				<BackTo text='All Products' href='products' />
				<Title title='Checkout' />
				{cancel.isCancelled && <InfoMessage message={cancel.message} />}
				<CheckoutItem />
			</Container>
		</>
	);
}
