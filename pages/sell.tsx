import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import CreateProduct from '../components/Product/CreateProduct';
import Title from '../components/Common/Title';
import checkUser from '../lib/checkUser';

export default function Sell() {
	return (
		<>
			<Head>
				<title>Sell Your Item | Mercado</title>
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
				<Title title='Sell your unwanted items' />
				<CreateProduct />
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to sell your product',
	});

	return {
		props: {},
	};
};
