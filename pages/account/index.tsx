import { SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import Title from '../../components/Title';
import AccountOption from '../../components/AccountOption';

export default function Account() {
	return (
		<>
			<Title title='My Account' />
			<SimpleGrid columns={2} spacing={10}>
				<AccountOption
					heading='My Products'
					imageUrl='products.jpeg'
					href='products'
				/>
				<AccountOption
					heading='My Orders'
					imageUrl='orders.jpeg'
					href='orders'
				/>
				<AccountOption
					heading='My Details'
					imageUrl='details.jpeg'
					href='details'
				/>
				<AccountOption
					heading='My Insights'
					imageUrl='insights.jpeg'
					href='insights'
				/>
			</SimpleGrid>
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
