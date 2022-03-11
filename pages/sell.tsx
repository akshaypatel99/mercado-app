import Router from 'next/router';
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

export async function getServerSideProps(context: MyPageContext) {
	await checkUser(context, 'Please log in to sell your product');

	return {
		props: {
			user: context.user,
		},
	};
}
