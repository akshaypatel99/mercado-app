import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
	Box,
	Heading,
	Link,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ProductForm from './ProductForm';
import ErrorMessage from '../Message/ErrorMessage';
import { UpdatedProductType } from './EditProduct';

export type ProductMutationResult = {
	message: string;
	product: {
		_id: string;
		user: {
			name: string;
		};
		name: string;
		description: string;
		image: string;
		category: string;
		price: number;
	};
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
	const [updatedProduct, setUpdatedProduct] = useState<UpdatedProductType>({
		name: '',
		description: '',
		image: '',
		category: '',
		price: 0,
	});

	const [create, { data, loading, error }] = useMutation<{
		createProduct: ProductMutationResult;
	}>(CREATE_PRODUCT, {
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

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<Box mt='4'>
				<Heading fontSize='2xl' my='4'>
					Enter product details
				</Heading>

				{data && (
					<Alert
						status='success'
						variant='subtle'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						textAlign='center'
						height='200px'
						bg='brand.green'
					>
						<AlertIcon boxSize='40px' mr={0} color='brand.800' />
						<AlertTitle mt={4} mb={1} fontSize='lg'>
							{data.createProduct.message}
						</AlertTitle>
						<AlertDescription maxWidth='sm'>
							Thank you for choosing{' '}
							<span style={{ fontWeight: 'bold' }}>Mercado</span> to sell your
							item.{' '}
							<NextLink
								href={`/product/${data.createProduct.product._id}`}
								passHref
							>
								<Link
									fontWeight='bold'
									color='brand.750'
									_hover={{ color: 'brand.cream' }}
								>
									See your product here.
								</Link>
							</NextLink>
						</AlertDescription>
					</Alert>
				)}

				{error && <ErrorMessage error={error} />}

				<ProductForm
					mutationFn={create}
					updatedProduct={updatedProduct}
					setUpdatedProduct={setUpdatedProduct}
				/>
			</Box>
		</>
	);
}
