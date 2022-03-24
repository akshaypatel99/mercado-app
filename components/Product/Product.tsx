import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import formatCurrency from '../../lib/formatCurrency';
import { ProductProps } from '../../pages/product/[id]';
import EditProduct from './EditProduct';
import ProductCustomerOptions from './ProductCustomerOptions';

export default function Product({ product, user }: ProductProps) {
	return (
		<>
			<Box w='100%' display={{ md: 'flex' }} my='6'>
				<Flex flexDir='column' w='100%'>
					<Image src={product.image} alt={product.name} justifySelf='center' />
					<Text
						color='brand.700'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						mt='2'
						textAlign={{ sm: 'right', md: 'left' }}
					>
						Seller: {product.user.name}
					</Text>
				</Flex>
				<Box w='100%' ml={{ md: '8' }}>
					<Text
						color='brand.700'
						fontWeight='bold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						{product.category}
					</Text>
					<Heading my='8' variant='product'>
						{product.name}
					</Heading>
					<Heading variant='product'>{formatCurrency(product.price)}</Heading>

					<Text my='8'>{product.description}</Text>

					<Text my='8' fontWeight='semibold'>
						Watched By:{' '}
						{product.watchedBy.length === 0
							? 'Not watched yet'
							: product.watchedBy.length === 1
							? '1 person'
							: `${product.watchedBy.length} people`}
					</Text>

					<Box mt='4'>
						{user && user.role === 'ADMIN' && (
							<ProductCustomerOptions product={product} />
						)}
						{!user ? (
							<ProductCustomerOptions product={product} />
						) : (user && user._id === product.user._id) ||
						  user.role === 'ADMIN' ? (
							<EditProduct product={product} />
						) : (
							<ProductCustomerOptions product={product} />
						)}
					</Box>
				</Box>
			</Box>
		</>
	);
}
