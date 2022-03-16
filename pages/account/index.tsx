import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Title';
import Dashboard from '../../components/Dashboard';

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
			<Title title='My Account' />
			<Dashboard options={options} />
		</>
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
