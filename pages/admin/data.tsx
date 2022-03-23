import { GetServerSideProps } from 'next';
import checkUser from '../../lib/checkUser';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import InfoMessage from '../../components/Message/InfoMessage';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	await checkUser(context, {
		level: 'ADMIN',
		redirect: true,
		message: 'You do not have permission to view this page',
	});

	return {
		props: {},
	};
};
