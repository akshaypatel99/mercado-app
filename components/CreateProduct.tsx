import { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box, Heading, Image, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { AuthContext } from '../context/auth';
import ProductForm from './ProductForm';

type Product = {
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
};

export const CREATE_PRODUCT = gql`
	mutation CreateProduct($input: ProductInput) {
		createProduct(input: $input) {
			message
			product {
				_id
				user {
					name
				}
				name
				description
				image
				category
				price
			}
		}
	}
`;

export default function CreateProduct() {
	const [updatedProduct, setUpdatedProduct] = useState<Product>({
		name: '',
		description: '',
		image: '',
		category: '',
		price: 0,
	});
	const auth = useContext(AuthContext);

	const [create, { data, loading, error }] = useMutation(CREATE_PRODUCT, {
		variables: {
			input: {
				name: updatedProduct.name,
				description: updatedProduct.description,
				image: updatedProduct.image,
				category: updatedProduct.category,
				price: updatedProduct.price,
			},
		},
	});

	if (auth) if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<Box mt='4'>
				<Heading fontSize='2xl' my='4' color='brand.800'>
					Create Product
				</Heading>
				{auth.user ? (
					<ProductForm
						mutationFn={create}
						updatedProduct={updatedProduct}
						setUpdatedProduct={setUpdatedProduct}
					/>
				) : (
					<Text>Please login to create a product</Text>
				)}
			</Box>

			{data && (
				<Box>
					<Text fontSize='sm' fontWeight='semibold' color='brand.700'>
						{data.createProduct.message}{' '}
						<NextLink
							href={`/product/${data.createProduct.product._id}`}
							passHref
						>
							<Link fontWeight='bold' color='brand.800'>
								See your product here.
							</Link>
						</NextLink>
					</Text>
				</Box>
			)}
		</>
	);
}
