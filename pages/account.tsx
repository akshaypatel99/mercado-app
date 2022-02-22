import AccountInfo from '../components/AccountInfo';

export default function Account() {
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
