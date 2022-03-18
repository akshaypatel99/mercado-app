import { useState } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Image,
	Link,
	LinkBox,
	LinkOverlay,
	IconButton,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { localDate } from '../../lib/localDate';
import { FiInfo, FiMinus, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import formatCurrency from '../../lib/formatCurrency';
import DeleteDialog from '../Common/DeleteDialog';
import ErrorMessage from '../Message/ErrorMessage';
import InfoMessage from '../Message/InfoMessage';

const DELETE_PRODUCT = gql`
	mutation DeleteProduct($deleteProductId: ID!) {
		deleteProduct(id: $deleteProductId) {
			message
			product {
				_id
			}
		}
	}
`;

const RESTOCK_PRODUCT = gql`
	mutation Restock($restockProductId: ID!) {
		restock(id: $restockProductId) {
			message
			product {
				_id
			}
		}
	}
`;

export default function AdminProducts({ products, count }) {
	const [productToDelete, setProductToDelete] = useState(null);
	const [error, setError] = useState(null);
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [deleteProduct, { data: deleteData, error: deleteError }] = useMutation(
		DELETE_PRODUCT,
		{
			onCompleted: () =>
				Router.push(`/admin/products?message=Product deleted!`),
		}
	);

	const [restockProduct, { data: restockData, error: restockError }] =
		useMutation(RESTOCK_PRODUCT, {
			onCompleted: () =>
				Router.push(`/admin/products?message=Product restocked!`),
		});

	const handleDelete = (productId) => {
		deleteProduct({
			variables: {
				deleteProductId: productId,
			},
		});
		if (deleteError) {
			setError(deleteError);
		}
		setProductToDelete(null);
		onClose();
	};

	const handleRestock = (productId) => {
		restockProduct({
			variables: {
				restockProductId: productId,
			},
		});
		if (restockError) {
			setError(restockError);
		}
	};

	function returnId(product) {
		const order = product.orders.find(
			(order) => order.createdAt.slice(0, 19) === product.soldOn.slice(0, 19)
		);
		return order ? order._id : null;
	}

	return (
		<>
			{error && <ErrorMessage error={error} />}
			{router && router.query.message && (
				<InfoMessage message={router.query.message} />
			)}
			<Table variant='simple' color='brand.700'>
				<TableCaption placement='top'>
					Click the information icon to see further details
				</TableCaption>
				<Thead>
					<Tr>
						<Th>Product ID</Th>
						<Th>Name</Th>
						<Th>Created</Th>
						<Th isNumeric>Price (£)</Th>
						<Th>Sold On</Th>
						<Th>Restock</Th>
						<Th>User</Th>
						<Th>Info</Th>
						<Th>Delete</Th>
					</Tr>
				</Thead>
				<Tbody>
					{products &&
						products.map((product) => (
							<Tr key={product._id}>
								<Td>{product._id}</Td>
								<Td>
									<LinkBox>
										<NextLink href={`/product/${product._id}`} passHref>
											<LinkOverlay
												display='flex'
												alignItems='center'
												_hover={{ textDecoration: 'underline' }}
											>
												<Image
													src={product.image}
													alt={product.name}
													w='40px'
													h='40px'
													mr='4'
												/>
												{product.name}
											</LinkOverlay>
										</NextLink>
									</LinkBox>
								</Td>
								<Td>{localDate(product.createdAt)}</Td>
								<Td isNumeric>{product.price.toFixed(2)}</Td>
								<Td>
									{product.soldOn ? (
										<NextLink href={`/order/${returnId(product)}`} passHref>
											<Link>{localDate(product.soldOn)}</Link>
										</NextLink>
									) : (
										<FiMinus />
									)}
								</Td>
								<Td>
									<IconButton
										icon={<FiRotateCcw />}
										aria-label='Return to stock'
										disabled={!product.isSold}
										onClick={() => {
											handleRestock(product._id);
										}}
									/>
								</Td>
								<Td>
									<NextLink href={`/admin/user/${product.user._id}`}>
										<Link>{product.user.name}</Link>
									</NextLink>
								</Td>
								<Td>
									<IconButton
										icon={<FiInfo />}
										aria-label='More information'
										onClick={() => Router.push(`/product/${product._id}`)}
									/>
								</Td>

								<Td>
									<IconButton
										icon={<FiTrash2 />}
										aria-label='Delete product'
										onClick={() => {
											setProductToDelete(product._id);
											onOpen();
										}}
									/>
								</Td>
							</Tr>
						))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Td colSpan={3}>
							<Text fontWeight='semibold'>Total: {count}</Text>
						</Td>
						<Td isNumeric fontWeight='bold'>
							{formatCurrency(
								products.reduce((acc, product) => {
									return acc + product.price;
								}, 0)
							)}
						</Td>
					</Tr>
				</Tfoot>
			</Table>
			<DeleteDialog
				isOpen={isOpen}
				onClose={onClose}
				heading='Product'
				handleDelete={handleDelete}
				id={productToDelete}
			/>
		</>
	);
}
