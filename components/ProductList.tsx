import { gql, useQuery } from '@apollo/client';
import { SimpleGrid } from '@chakra-ui/react';
import ProductListItem from './ProductListItem';

type Product = {
	_id: string;
	name: string;
	image: string;
	category: string;
	price: number;
};

export const ALL_PRODUCTS = gql`
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
`;

export default function ProductList() {
	const { data, loading, error } = useQuery(ALL_PRODUCTS, {
		variables: {
			params: {
				pageSize: 20,
				page: 1,
			},
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<SimpleGrid minChildWidth='350px' spacing='60px' mt='8'>
			{data.products.results.map((product: Product) => (
				<ProductListItem
					key={product._id}
					product={product}
					isNew={Math.random()}
				/>
			))}
		</SimpleGrid>
	);
}
