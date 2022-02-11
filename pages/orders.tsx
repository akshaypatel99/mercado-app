import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function Orders({ token }) {
	const auth = useContext(AuthContext);

	return (
		<>
			<div>I am the Orders Page</div>
			{token}
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
