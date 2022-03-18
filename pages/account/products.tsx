import { GetServerSideProps } from 'next';
import checkUser, { MyPageContext } from '../../lib/checkUser';
import { gql } from '@apollo/client';
import client from '../../lib/apollo-client';
import BackTo from '../../components/BackTo';
import Title from '../../components/Title';
import ErrorMessage from '../../components/ErrorMessage';
import InfoMessage from '../../components/InfoMessage';
import UserProducts from '../../components/UserProducts';
import { Container } from '@chakra-ui/react';

export default function MyProducts({ products, error }) {
	return (
		<Container variant='page'>
			<BackTo text='My Account' href='account' />
			<Title title='My Products' />
			{products.length < 1 && <InfoMessage message='No products yet' />}
			{products && products.length > 0 && <UserProducts products={products} />}
			{error && <ErrorMessage error={error} />}
		</Container>
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
					image
					price
					isSold
					soldOn
					watchedBy {
						_id
					}
					createdAt
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
