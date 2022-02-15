import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import ProductForm from './ProductForm';

type Product = {
	_id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
};

export const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($updateProductId: ID!, $input: ProductInput) {
		updateProduct(id: $updateProductId, input: $input) {
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

export default function EditProduct({ product }) {
	const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

	const [update, { data, loading, error }] = useMutation(UPDATE_PRODUCT, {
		variables: {
			updateProductId: product._id,
			input: {
				name: updatedProduct.name,
				description: updatedProduct.description,
				image: updatedProduct.image,
				category: updatedProduct.category,
				price: updatedProduct.price,
			},
		},
	});

	useEffect(() => {
		if (data) {
			setUpdatedProduct(data.updateProduct.product);
		}
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<Box mt='4'>
				<Heading fontSize='2xl' my='4' color='brand.800'>
					Edit Product
				</Heading>
				{data && data.updateProduct.message && (
					<Alert status='success' variant='subtle'>
						<AlertIcon />
						{data.updateProduct.message}
					</Alert>
				)}
				{error && (
					<Alert status='error' variant='subtle'>
						<AlertIcon />
						{error.message}
					</Alert>
				)}
				<ProductForm
					product={product}
					mutationFn={update}
					updatedProduct={updatedProduct}
					setUpdatedProduct={setUpdatedProduct}
				/>
			</Box>
		</>
	);
}
