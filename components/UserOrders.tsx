import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
} from '@chakra-ui/react';
import { localDate } from '../lib/localDate';

export default function UserOrders({ orders }) {
	return (
		<Table variant='simple'>
			<TableCaption>Click on an order to view further details</TableCaption>
			<Thead>
				<Tr>
					<Th>Order ID</Th>
					<Th>Product</Th>
					<Th>Order date</Th>
					<Th>Subtotal (£)</Th>
					<Th>Total (£)</Th>
				</Tr>
			</Thead>
			<Tbody>
				{orders &&
					orders.map((order) => (
						<Tr key={order._id}>
							<Td>{order._id}</Td>
							<Td>{order.product.name}</Td>
							<Td>{localDate(order.createdAt)}</Td>
							<Td isNumeric>{order.subTotal.toFixed(2)}</Td>
							<Td isNumeric>{order.totalCost}</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	);
}
