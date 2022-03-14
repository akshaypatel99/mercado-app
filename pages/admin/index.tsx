import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Title';
import Dashboard from '../../components/Dashboard';

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
			<Title title='Admin Dashboard' />
			<Dashboard options={options} />
		</>
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
