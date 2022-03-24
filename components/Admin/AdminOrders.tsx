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
	IconButton,
	Link,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import NextLink from 'next/link';
import { localDate } from '../../lib/localDate';
import { FiCheck, FiInfo, FiTrash2, FiX } from 'react-icons/fi';
import formatCurrency from '../../lib/formatCurrency';
import DeleteDialog from '../Common/DeleteDialog';
import ErrorMessage from '../Message/ErrorMessage';
import InfoMessage from '../Message/InfoMessage';
import { AllOrdersProps } from '../../pages/admin/orders';

type MutationResult = {
	message: string;
	order: {
		_id: string;
	};
};

const DELETE_ORDER = gql`
	mutation DeleteOrder($deleteOrderId: ID!) {
		deleteOrder(id: $deleteOrderId) {
			message
			order {
				_id
			}
		}
	}
`;

export default function AdminOrders({ orders, count }: AllOrdersProps) {
	const [orderToDelete, setOrderToDelete] = useState<string>('');
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [deleteOrder, { data, error }] = useMutation<{
		deleteOrder: MutationResult;
	}>(DELETE_ORDER, {
		onCompleted: () => Router.push(`/admin/orders?message=Order deleted!`),
	});

	const handleDelete = (orderId: string) => {
		deleteOrder({
			variables: {
				deleteOrderId: orderId,
			},
		});
		setOrderToDelete('');
		onClose();
	};

	return (
		<>
			{error && <ErrorMessage error={error} />}
			{router && router.query.message && (
				<InfoMessage message={router.query.message} />
			)}
			<Table variant='simple'>
				<TableCaption placement='top'>
					Click the information icon to see further details
				</TableCaption>
				<Thead>
					<Tr>
						<Th>Order ID</Th>
						<Th>Product</Th>
						<Th>Order date</Th>
						<Th>Paid</Th>
						<Th isNumeric>Subtotal (£)</Th>
						<Th isNumeric>Platform fee (£)</Th>
						<Th isNumeric>Total (£)</Th>
						<Th>Info</Th>
						<Th>Delete</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders &&
						orders.map((order) => (
							<Tr key={order._id}>
								<Td>{order._id}</Td>
								<Td>
									<NextLink href={`/product/${order.product._id}`} passHref>
										<Link>{order.product.name}</Link>
									</NextLink>
								</Td>
								<Td>{localDate(order.createdAt)}</Td>
								<Td>{order.isPaid ? <FiCheck /> : <FiX />}</Td>
								<Td isNumeric>{order.subTotal.toFixed(2)}</Td>
								<Td isNumeric>{order.platformFee.toFixed(2)}</Td>
								<Td isNumeric>{order.totalCost}</Td>
								<Td>
									<IconButton
										icon={<FiInfo />}
										aria-label='More information'
										onClick={() => Router.push(`/order/${order._id}`)}
									/>
								</Td>
								<Td>
									<IconButton
										icon={<FiTrash2 />}
										aria-label='Delete product'
										onClick={() => {
											setOrderToDelete(order._id);
											onOpen();
										}}
									/>
								</Td>
							</Tr>
						))}
				</Tbody>
				<Tfoot>
					<Tr>
						<Td colSpan={5}>
							<Text fontWeight='semibold'>Total: {count}</Text>
						</Td>
						<Td isNumeric fontWeight='bold'>
							{formatCurrency(
								orders.reduce((acc, order) => {
									return acc + order.platformFee;
								}, 0)
							)}
						</Td>
						<Td isNumeric fontWeight='bold'>
							{formatCurrency(
								orders.reduce((acc, order) => {
									return acc + order.totalCost;
								}, 0)
							)}
						</Td>
					</Tr>
				</Tfoot>
			</Table>
			<DeleteDialog
				isOpen={isOpen}
				onClose={onClose}
				heading='Order'
				handleDelete={handleDelete}
				id={orderToDelete}
			/>
		</>
	);
}
