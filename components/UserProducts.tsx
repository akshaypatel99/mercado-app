import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Image,
	LinkBox,
	LinkOverlay,
	IconButton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Router from 'next/router';
import { localDate } from '../lib/localDate';
import { FiCheck, FiInfo, FiX } from 'react-icons/fi';

export default function UserProducts({ products }) {
	return (
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
					<Th>Info</Th>
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
										<LinkOverlay display='flex' alignItems='center'>
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
									icon={<FiInfo />}
									aria-label='More information'
									onClick={() => Router.push(`/product/${product._id}`)}
								/>
							</Td>
						</Tr>
					))}
			</Tbody>
		</Table>
	);
}
