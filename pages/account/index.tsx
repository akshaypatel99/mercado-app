import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Common/Title';
import Dashboard from '../../components/Dashboard/Dashboard';
import { Container } from '@chakra-ui/react';

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
		<Container variant='page'>
			<Title title='My Account' />
			<Dashboard options={options} />
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your account',
	});

	return {
		props: {},
	};
};
