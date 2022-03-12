import { SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Title';
import AccountOption from '../../components/AccountOption';

export default function Admin() {
	return (
		<>
			<Title title='My Account' />
			<SimpleGrid columns={2} spacing={10}>
				<AccountOption
					heading='All Products'
					imageUrl='products.jpeg'
					href='products'
				/>
				<AccountOption
					heading='All Orders'
					imageUrl='orders.jpeg'
					href='orders'
				/>
				<AccountOption
					heading='All Users'
					imageUrl='details.jpeg'
					href='details'
				/>
				<AccountOption heading='All Data' imageUrl='insights.jpeg' href='/' />
			</SimpleGrid>
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
