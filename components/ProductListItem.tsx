import { Badge, Box, Image } from '@chakra-ui/react';
import Link from 'next/link';
import formatPrice from '../lib/formatPrice';

type ProductProps = {
	_id: string;
	name: string;
	image: string;
	category: string;
	price: number;
};

export default function Product({
	product,
	isNew,
}: {
	product: ProductProps;
	isNew: number;
}) {
	return (
		<Link href={`/product/${product._id}`}>
			<Box
				maxW='sm'
				borderWidth='1px'
				borderRadius='lg'
				borderColor='brand.200'
				overflow='hidden'
				boxShadow='lg'
				cursor='pointer'
				_hover={{ borderColor: 'brand.300' }}
			>
				<Image src={product.image} alt={product.name} />

				<Box p='6' bg='brand.150' _hover={{ backgroundColor: 'brand.200' }}>
					<Box display='flex' alignItems='baseline' mb='4'>
						{isNew > 0.5 ? (
							<Badge
								borderRadius='full'
								px='2'
								mr='2'
								colorScheme='whatsapp'
								variant='subtle'
							>
								New
							</Badge>
						) : null}
						<Box
							color='brand.800'
							fontWeight='semibold'
							letterSpacing='wide'
							fontSize='xs'
							textTransform='uppercase'
						>
							{product.category}
						</Box>
					</Box>

					<Box display='flex' pt='4' justifyContent='space-between'>
						<Box
							fontSize='1.3rem'
							fontWeight='semibold'
							as='h4'
							lineHeight='tight'
							isTruncated
						>
							{product.name}
						</Box>
						<Box
							fontSize='1.3rem'
							fontWeight='semibold'
							as='h4'
							lineHeight='tight'
							isTruncated
						>
							{formatPrice(product.price)}
						</Box>
					</Box>
				</Box>
			</Box>
		</Link>
	);
}
