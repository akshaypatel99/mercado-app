import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useUser } from '../hooks/useUser';

export default function AccountInfo() {
	// const { data, loading, error } = useUser();
	const auth = useContext(AuthContext);

	return (
		<>
			<div>I am the Account Info Component</div>
			{/* {data?.currentUser?.name}
			{data?.currentUser?.role}
			{error && error.message} */}
			{auth.user ? auth?.user?.name : 'Please login'}
		</>
	);
}
