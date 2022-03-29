import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import checkUser from '../../lib/checkUser';
import Title from '../../components/Common/Title';
import Dashboard from '../../components/Dashboard/Dashboard';

export default function Account() {
	const options = [
		{
			heading: 'My Products',
			href: 'account/products',
			imageUrl: 'products.jpeg',
		},
		{
			heading: 'My Orders',
			href: 'account/orders',
			imageUrl: 'orders.jpeg',
		},
		{
			heading: 'My Profile',
			href: 'account/profile',
			imageUrl: 'profile.jpeg',
		},
		{
			heading: 'Contact Us',
			href: 'contact',
			imageUrl: 'contact.jpeg',
		},
	];

	return (
		<>
			<Head>
				<title>My Account | Mercado</title>
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
				<Title title='My Account' />
				<Dashboard options={options} />
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your account',
	});

	return {
		props: {
			user,
		},
	};
};
