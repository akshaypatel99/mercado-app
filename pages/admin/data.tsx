import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import InfoMessage from '../../components/InfoMessage';
import { Container } from '@chakra-ui/react';

export default function AllData() {
	return (
		<Container variant='page'>
			<BackTo text='Admin Dashboard' href='admin' />
			<Title title='All Data' />
			<InfoMessage message='Coming soon' />
		</Container>
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
