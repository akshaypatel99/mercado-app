import { gql, useQuery } from '@apollo/client';
import { Box, Center, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import formatPrice from '../lib/formatPrice';

type Product = {
	_id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
	user: {
		name: string;
	};
};

export const SINGLE_PRODUCT = gql`
	query SingleProduct($productId: ID!) {
		product(id: $productId) {
			_id
			name
			description
			image
			category
			price
			user {
				_id
				name
			}
		}
	}
`;

export default function Product({ id }: { id: string }) {
	const { data, loading, error } = useQuery(SINGLE_PRODUCT, {
		variables: {
			productId: id,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const { product } = data;

	return (
		<>
			<Box mb='4' fontSize='sm'>
				<Link href='/products'>Back to all products</Link>
			</Box>
			<Box w='100%' display={{ lg: 'flex' }}>
				<Center>
					<Image src={product.image} alt={product.name} />
				</Center>
				<Box ml={{ sm: '6', lg: '4' }}>
					<Box
						color='brand.800'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						{product.category}
					</Box>
					<Heading my='8'>{product.name}</Heading>
					<Heading textColor='brand.black'>
						{formatPrice(product.price)}
					</Heading>
					<Box my='16'>{product.description}</Box>
					<Box
						color='brand.800'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						Seller: {product.user.name}
					</Box>
				</Box>
			</Box>
		</>
	);
}
