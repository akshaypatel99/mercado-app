import { Box, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';
import formatPrice from '../lib/formatPrice';
import ErrorMessage from './ErrorMessage';

export default function WatchListItem({ product }) {
	const { watchListOnClose, toggleUserWatchList, toggleWatchListError } =
		useContext(WatchListContext);

	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				borderBottom='1px solid lightgray'
				p='2'
				mb='4'
			>
				<Link href={`/product/${product._id}`} passHref>
					<Image
						boxSize='100px'
						objectFit='cover'
						src={product.image}
						alt={product.name}
						onClick={() => watchListOnClose()}
						cursor='pointer'
					/>
				</Link>
				<Box ml='2' w='100%'>
					<Heading fontSize='xl'>{product.name}</Heading>
					<Heading fontSize='xl'>{formatPrice(product.price)}</Heading>
				</Box>
				<Box display='flex' flexDir='column'>
					<Button size='sm'>Buy Now</Button>
					<Button
						size='sm'
						my='2'
						color='brand.white'
						bg='brand.500'
						_hover={{ bg: 'brand.600' }}
						_active={{ bg: 'brand.700' }}
						onClick={() => toggleUserWatchList(product._id)}
					>
						Remove
					</Button>
				</Box>
			</Box>
			{toggleWatchListError && <ErrorMessage error={toggleWatchListError} />}
		</>
	);
}
