import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Link,
	IconButton,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { localDate } from '../lib/localDate';
import { FiInfo } from 'react-icons/fi';

export default function AdminUsers({ users, count }) {
	return (
		<>
			<Text fontWeight='semibold'>Total: {count}</Text>
			<Table variant='simple' color='brand.700'>
				<TableCaption placement='top'>
					Click the information icon to see further details
				</TableCaption>
				<Thead>
					<Tr>
						<Th>User ID</Th>
						<Th>Name</Th>
						<Th>Email</Th>
						<Th>Role</Th>
						<Th isNumeric>Products</Th>
						<Th isNumeric>Orders</Th>
						<Th isNumeric>Watchlist Products</Th>
						<Th>Created</Th>
						<Th>Info</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users &&
						users.map((user) => (
							<Tr key={user._id}>
								<Td>{user._id}</Td>
								<Td>
									<NextLink href={`/admin/user/${user._id}`}>
										<Link>{user.name}</Link>
									</NextLink>
								</Td>
								<Td>{user.email}</Td>
								<Td>{user.role}</Td>
								<Td isNumeric>{user.userProducts.length}</Td>
								<Td isNumeric>{user.userOrders.length}</Td>
								<Td isNumeric>{user.userWatchlist.length}</Td>
								<Td>{localDate(user.createdAt)}</Td>
								<Td>
									<IconButton
										icon={<FiInfo />}
										aria-label='More information'
										onClick={() => Router.push(`/admin/user/${user._id}`)}
									/>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</>
	);
}
