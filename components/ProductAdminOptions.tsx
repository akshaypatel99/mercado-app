import { gql, useMutation } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';
import Router from 'next/router';
import ErrorMessage from './ErrorMessage';

const DELETE_PRODUCT = gql`
	mutation DeleteProduct($id: ID!) {
		deleteProduct(id: $id) {
			id
		}
	}
`;

const RETURN_TO_STOCK = gql`
	mutation ReturnToStock($id: ID!) {
		restock(id: $id) {
			id
		}
	}
`;

export default function ProductAdminOptions({ product }) {
	const [deleteProduct, { loading: deleteLoading, error: deleteError }] =
		useMutation(DELETE_PRODUCT, {
			variables: { id: product.id },
		});

	const [
		restock,
		{ loading: returnToStockLoading, error: returnToStockError },
	] = useMutation(RETURN_TO_STOCK, {
		variables: { id: product.id },
	});

	const handleDelete = () => {
		deleteProduct();
		Router.push('/admin/products');
	};

	const handleReturnToSale = () => {
		restock();
	};

	return (
		<>
			<Box mb='6'>
				<Button disabled={!product.isSold} onClick={() => {}} variant='primary'>
					Restock
				</Button>
				<Button ml='4' onClick={() => {}} colorScheme='red'>
					Delete product
				</Button>
			</Box>
		</>
	);
}
