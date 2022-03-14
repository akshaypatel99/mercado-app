import { Box, Heading, Image, Text } from '@chakra-ui/react';
import formatPrice from '../lib/formatPrice';
import EditProduct from './EditProduct';
import ProductCustomerOptions from './ProductCustomerOptions';
import BackTo from './BackTo';
import ProductAdminOptions from './ProductAdminOptions';

type SingleProduct = {
	product: {
		_id: string;
		name: string;
		description: string;
		image: string;
		category: string;
		price: number;
		user: {
			_id: string;
			name: string;
		};
		watchedBy: {
			_id: string;
		};
	};
};

export default function Product({ product, error, user }) {
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<BackTo text='All Products' href='products' />
			<Box w='100%' display={{ lg: 'flex' }} my='6'>
				<Box>
					<Image src={product.image} alt={product.name} />
					<Text
						color='brand.700'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						mt='2'
					>
						Seller: {product.user.name}
					</Text>
				</Box>
				<Box ml={{ sm: '6', lg: '4' }}>
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
					<Heading variant='product'>{formatPrice(product.price)}</Heading>

					<Text my='8'>{product.description}</Text>

					<Text my='8' fontWeight='semibold'>
						Watched By: {product.watchedBy.length}
					</Text>

					<Box mt='4'>
						{user.role === 'ADMIN' && <ProductAdminOptions product={product} />}
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
