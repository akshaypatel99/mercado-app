import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import CreateProduct from '../components/Product/CreateProduct';
import Title from '../components/Common/Title';
import checkUser, { MyPageContext } from '../lib/checkUser';

export default function Sell() {
	return (
		<Container variant='page'>
			<Title title='Sell your unwanted items' />
			<CreateProduct />
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to sell your product',
	});

	return {
		props: {
			user: context.user,
		},
	};
};
