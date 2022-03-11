import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import ProductList from '../components/ProductList';
import Title from '../components/Title';

export default function Products({ products, loading, error }) {
	return (
		<>
			<Title title='Find your next best bargain today...' />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export async function getServerSideProps() {
	const { data, loading, error } = await client.query({
		query: gql`
			query AllProducts($params: QueryParams) {
				products(params: $params) {
					results {
						_id
						name
						image
						category
						price
					}
					info {
						count
					}
				}
			}
		`,
		variables: {
			params: {
				pageSize: 20,
				page: 1,
			},
		},
	});

	const isNewProducts = data.products.results.map((product) => ({
		...product,
		isNew: Math.random() > 0.5,
	}));

	return {
		props: {
			products: isNewProducts,
			loading,
			error: error || null,
		},
	};
}
