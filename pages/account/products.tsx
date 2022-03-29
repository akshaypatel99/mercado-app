import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ApolloError, gql } from '@apollo/client';
import { Container } from '@chakra-ui/react';
import checkUser from '../../lib/checkUser';
import client from '../../lib/apollo-client';
import BackTo from '../../components/Common/BackTo';
import Title from '../../components/Common/Title';
import ErrorMessage from '../../components/Message/ErrorMessage';
import InfoMessage from '../../components/Message/InfoMessage';
import UserProducts from '../../components/User/UserProducts';

export default function MyProducts({ products, error }: UserProductsProps) {
	return (
		<>
			<Head>
				<title>My Products | Mercado</title>
				<meta
					name='description'
					content='Mercado - buy and sell second-hand items'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link
					rel='icon'
					href='images/logo-light.svg'
					sizes='any'
					type='image/svg+xml'
				/>
			</Head>
			<Container variant='page'>
				<BackTo text='My Account' href='account' />
				<Title title='My Products' />
				{products.length < 1 && <InfoMessage message='No products yet' />}
				{products && products.length > 0 && (
					<UserProducts products={products} />
				)}
				{error && <ErrorMessage error={error} />}
			</Container>
		</>
	);
}

export type UserProductsType = {
	_id: string;
	name: string;
	image: string;
	price: number;
	isSold: boolean;
	soldOn: Date;
	watchedBy: {
		_id: string;
	}[];
	createdAt: Date;
}[];

type UserProductsProps = {
	products: UserProductsType;
	error: ApolloError | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = await checkUser(context, {
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
