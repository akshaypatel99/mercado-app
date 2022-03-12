import { Box, Heading, Image } from '@chakra-ui/react';
import formatPrice from '../lib/formatPrice';
import EditProduct from './EditProduct';
import ProductCustomerOptions from './ProductCustomerOptions';
import BackTo from './BackTo';

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
					<Box
						color='brand.blue'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						mt='2'
					>
						Seller: {product.user.name}
					</Box>
				</Box>
				<Box ml={{ sm: '6', lg: '4' }}>
					<Box
						color='brand.blue'
						fontWeight='bold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						{product.category}
					</Box>
					<Heading my='8' variant='product'>
						{product.name}
					</Heading>
					<Heading variant='product'>{formatPrice(product.price)}</Heading>
					<Box my='16'>{product.description}</Box>

					<Box mt='4'>
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
