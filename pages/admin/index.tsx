import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Title';
import Dashboard from '../../components/Dashboard';
import { Container } from '@chakra-ui/react';

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
		<Container variant='page'>
			<Title title='Admin Dashboard' />
			<Dashboard options={options} />
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'Please log in to view your account',
	});

	return {
		props: {},
	};
};
