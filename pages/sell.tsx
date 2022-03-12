import { GetServerSideProps } from 'next';
import CreateProduct from '../components/CreateProduct';
import Title from '../components/Title';
import checkUser, { MyPageContext } from '../lib/checkUser';

export default function Sell() {
	return (
		<>
			<Title title='Sell your unwanted items' />
			<CreateProduct />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your product',
	});

	return {
		props: {
			user: context.user,
		},
	};
};
