import { Badge, Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
import formatCurrency from '../../lib/formatCurrency';
import { Product } from '../../pages/products';

export default function ProductListItem({ product }: { product: Product }) {
	return (
		<LinkBox
			maxW='sm'
			borderWidth='1px'
			borderRadius='lg'
			borderColor={product.isSold ? 'brand.300' : 'brand.600'}
			bg={product.isSold ? 'brand.300' : 'brand.600'}
			overflow='hidden'
			boxShadow='lg'
			cursor='pointer'
			_hover={{
				borderColor: product.isSold ? 'brand.red' : 'brand.green',
				backgroundColor: product.isSold ? 'brand.red' : 'brand.green',
			}}
			color='brand.white'
		>
			<NextLink href={`/product/${product._id}`} passHref>
				<LinkOverlay>
					<Image src={product.image} alt={product.name} />
				</LinkOverlay>
			</NextLink>

			<Box p='4'>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='baseline'
					mb='2'
				>
					<Box
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
					>
						{product.category}
					</Box>
					{product.isSold ? (
						<Badge
							borderRadius='full'
							px='2'
							colorScheme='red'
							variant='subtle'
						>
							Sold
						</Badge>
					) : product.isNew ? (
						<Badge
							borderRadius='full'
							px='2'
							colorScheme='whatsapp'
							variant='subtle'
						>
							New
						</Badge>
					) : null}
				</Box>

				<Box display='flex' pt='3' justifyContent='space-between'>
					<Box
						fontSize='1.375rem'
						fontWeight='semibold'
						lineHeight='tight'
						overflowWrap='break-word'
					>
						{product.name}
					</Box>
					<Box
						fontSize='1.375rem'
						fontWeight='semibold'
						lineHeight='tight'
						isTruncated
					>
						{formatCurrency(product.price)}
					</Box>
				</Box>
			</Box>
		</LinkBox>
	);
}
