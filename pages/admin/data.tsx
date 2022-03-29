import { GetServerSideProps } from 'next';
import Head from 'next/head';
import checkUser from '../../lib/checkUser';
import { Container } from '@chakra-ui/react';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import InfoMessage from '../../components/Message/InfoMessage';

export default function AllData() {
	return (
		<>
			<Head>
				<title>All Data | Mercado</title>
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
				<BackTo text='Admin Dashboard' href='admin' />
				<Title title='All Data' />
				<InfoMessage message='Coming soon' />
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});

	return {
		props: {},
	};
};
