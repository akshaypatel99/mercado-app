import {
	Table,
	Thead,
	Tbody,
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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { localDate } from '../lib/localDate';
import { FiCheck, FiInfo, FiRotateCcw, FiTrash2, FiX } from 'react-icons/fi';

export default function AdminProducts({ products, count }) {
	return (
		<>
			<Text fontWeight='semibold'>Total: {count}</Text>
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
						<Th>Sold</Th>
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
								<Td>{product.isSold ? <FiCheck /> : <FiX />}</Td>
								<Td>
									<IconButton
										icon={<FiRotateCcw />}
										aria-label='Return to stock'
										onClick={() => {}}
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
										onClick={() => {}}
									/>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</>
	);
}
