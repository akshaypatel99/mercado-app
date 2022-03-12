import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Image,
} from '@chakra-ui/react';
import { localDate } from '../lib/localDate';
import { FiCheck, FiX } from 'react-icons/fi';

export default function UserProducts({ products }) {
	return (
		<Table variant='simple'>
			<TableCaption>Click on a product to view further details</TableCaption>
			<Thead>
				<Tr>
					<Th>Product ID</Th>
					<Th></Th>
					<Th>Name</Th>
					<Th>Created</Th>
					<Th>Price (£)</Th>
					<Th>Sold</Th>
				</Tr>
			</Thead>
			<Tbody>
				{products &&
					products.map((product) => (
						<Tr key={product._id}>
							<Td>{product._id}</Td>
							<Td>
								<Image
									src={product.image}
									alt={product.name}
									w='40px'
									h='40px'
								/>
							</Td>
							<Td>{product.name}</Td>
							<Td>{localDate(product.createdAt)}</Td>
							<Td isNumeric>{product.price.toFixed(2)}</Td>
							<Td>{product.isSold ? <FiCheck /> : <FiX />}</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	);
}
