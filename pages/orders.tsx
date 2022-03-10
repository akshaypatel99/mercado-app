import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Orders({ refresh, access }) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div>I am the Orders Page</div>
			{refresh}
			{access}
		</>
	);
}

export async function getServerSideProps({ req, res }) {
	return {
		props: {
			refresh: req.cookies['refresh'] || '',
			access: req.cookies['access'] || '',
		},
	};
}
