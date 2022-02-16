import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AccountInfo from '../components/AccountInfo';

export default function Account({ token }) {
	const auth = useContext(AuthContext);

	return (
		<>
			<div>I am the Account Page</div>
			<AccountInfo />
		</>
	);
}

export async function getServerSideProps({ req, res }) {
	return {
		props: {
			token: req.cookies['token'] || '',
		},
	};
}
