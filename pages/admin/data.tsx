import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';

export default function AllData() {
	return (
		<>
			<BackTo text='Admin Dashboard' href='admin' />
			<Title title='All Data' />
			<InfoMessage message='Coming soon' />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});

	return {
		props: {},
	};
};
