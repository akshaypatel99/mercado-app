import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AccountInfo() {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div>I am the Account Info Component</div>
			{user ? user?.name : 'Please login'}
		</>
	);
}
