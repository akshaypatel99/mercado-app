import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import checkUser from '../../lib/checkUser';
import Title from '../../components/Common/Title';
import Dashboard from '../../components/Dashboard/Dashboard';

export default function Admin() {
	const options = [
		{
			heading: 'All Products',
			href: 'admin/products',
		},
		{
			heading: 'All Orders',
			href: 'admin/orders',
		},
		{
			heading: 'All Users',
			href: 'admin/users',
		},
		{
			heading: 'All Data',
			href: 'admin/data',
		},
	];
	return (
		<>
			<Head>
				<title>Admin Dashboard | Mercado</title>
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
				<Title title='Admin Dashboard' />
				<Dashboard options={options} />
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'Please log in to view your account',
	});

	return {
		props: {},
	};
};
