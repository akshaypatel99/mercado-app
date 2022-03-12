import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import BackTo from '../../components/BackTo';
import OrderList from '../../components/OrderList';
import Title from '../../components/Title';

export default function Orders() {
	return (
		<>
			<BackTo text='my account' href='account' />
			<Title title='My Orders' />
			<OrderList />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, true, 'Please log in to view your orders');

	return {
		props: {},
	};
};
