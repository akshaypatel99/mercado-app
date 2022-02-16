import { gql, useMutation } from '@apollo/client';
import { Button, Heading } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

export default function LogoutBtn() {
	const [logout, { loading, error, reset }] = useMutation(LOGOUT);
	const auth = useContext(AuthContext);

	// useEffect(() => {
	// 	auth.logout();
	// });

	async function handleLogout(e: React.SyntheticEvent) {
		await logout();
	}

	return (
		<Button
			type='submit'
			variant='solid'
			isLoading={loading}
			colorScheme='yellow'
			onClick={handleLogout}
		>
			<Heading fontSize='xl'>Logout</Heading>
		</Button>
	);
}
