import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	IconButton,
	Link,
	Text,
} from '@chakra-ui/react';
import Router from 'next/router';
import NextLink from 'next/link';
import { localDate } from '../lib/localDate';
import { FiCheck, FiInfo, FiX } from 'react-icons/fi';

export default function AdminOrders({ orders, count }) {
	return (
		<>
			<Text fontWeight='semibold'>Total: {count}</Text>
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
						<Th isNumeric>Total (£)</Th>
						<Th>Info</Th>
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
								<Td isNumeric>{order.totalCost}</Td>
								<Td>
									<IconButton
										icon={<FiInfo />}
										aria-label='More information'
										onClick={() => Router.push(`/admin/order/${order._id}`)}
									/>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</>
	);
}
