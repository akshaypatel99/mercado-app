import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';

export default function MyDetails() {
	return (
		<>
			<BackTo text='My Account' href='account' />
			<Title title='My Details' />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your account details',
	});

	return {
		props: {},
	};
};
