import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import ProductForm from './ProductForm';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

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

	return (
		<>
			<Box mt='4'>
				<Heading fontSize='2xl' my='4'>
					Edit Product
				</Heading>
				{data && data.updateProduct.message && (
					<SuccessMessage message={data.updateProduct.message} />
				)}
				{error && <ErrorMessage error={error} />}
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
