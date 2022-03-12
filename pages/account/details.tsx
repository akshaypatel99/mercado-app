import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';

export default function MyDetails() {
	return (
		<>
			<BackTo text='my account' href='account' />
			<Title title='My Details' />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, true, 'Please log in to view your account details');

	return {
		props: {},
	};
};
