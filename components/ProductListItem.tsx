import { Badge, Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';
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
		<LinkBox
			maxW='sm'
			borderWidth='1px'
			borderRadius='xl'
			borderColor='brand.blue'
			bg='brand.blue'
			overflow='hidden'
			boxShadow='lg'
			cursor='pointer'
			_hover={{
				borderColor: 'brand.green',
				backgroundColor: 'brand.green',
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
					{isNew > 0.5 ? (
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
						fontSize='xl'
						fontWeight='semibold'
						lineHeight='tight'
						overflowWrap='break-word'
					>
						{product.name}
					</Box>
					<Box
						fontSize='xl'
						fontWeight='semibold'
						lineHeight='tight'
						isTruncated
					>
						{formatPrice(product.price)}
					</Box>
				</Box>
			</Box>
		</LinkBox>
	);
}
