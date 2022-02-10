import { useUser } from '../hooks/useUser';

export default function AccountInfo() {
	const { data, loading, error } = useUser();
	return (
		<>
			<div>I am the Account Info Component</div>
			{data?.currentUser?.name}
			{data?.currentUser?.role}
			{error && error.message}
		</>
	);
}
