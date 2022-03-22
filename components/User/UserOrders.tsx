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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { localDate } from '../../lib/localDate';
import { FiInfo } from 'react-icons/fi';
import { UserOrdersType } from '../../pages/account/orders';

export default function UserOrders({ orders }: { orders: UserOrdersType }) {
	return (
		<Table variant='simple'>
			<TableCaption placement='top'>
				Click the information icon to see further details
			</TableCaption>
			<Thead>
				<Tr>
					<Th>Order ID</Th>
					<Th>Product</Th>
					<Th>Order date</Th>
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
							<Td isNumeric>{order.subTotal.toFixed(2)}</Td>
							<Td isNumeric>{order.totalCost}</Td>
							<Td>
								<IconButton
									icon={<FiInfo />}
									aria-label='More information'
									onClick={() => Router.push(`/order/${order._id}`)}
								/>
							</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	);
}
