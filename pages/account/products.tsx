import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';
import UserProducts from '../../components/UserProducts';

export default function MyProducts({ products, error }) {
	return (
		<>
			<BackTo text='My Account' href='account' />
			<Title title='My Products' />
			{products.length < 1 && <InfoMessage message='No products yet' />}
			{products && products.length > 0 && <UserProducts products={products} />}
			{error && <ErrorMessage error={error} />}
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: MyPageContext
) => {
	await checkUser(context, {
		level: 'USER',
		redirect: true,
		message: 'Please log in to view your products',
	});
	const Cookie = context.req.headers.cookie;
	const { data, error } = await client.query({
		context: { headers: { Cookie } },
		query: gql`
			query UserProducts {
				userProducts {
					_id
					name
					description
					image
					category
					price
					isSold
					watchedBy {
						_id
					}
					createdAt
					updatedAt
				}
			}
		`,
	});
	return {
		props: {
			products: data.userProducts,
			error: error || null,
		},
	};
};
