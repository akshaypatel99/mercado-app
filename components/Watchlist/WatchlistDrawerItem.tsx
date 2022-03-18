import { Box, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { CheckoutContext } from '../../context/CheckoutContext';
import { WatchlistContext } from '../../context/WatchlistReactContext';
import formatCurrency from '../../lib/formatCurrency';
import ErrorMessage from '../Message/ErrorMessage';

export default function WatchlistItem({ product }) {
	const { watchlistOnClose, toggleUserWatchlist, toggleWatchlistError } =
		useContext(WatchlistContext);
	const { buyNow } = useContext(CheckoutContext);

	return (
		<>
			<Box display='flex' alignItems='center' my='1'>
				<Link href={`/product/${product._id}`} passHref>
					<Image
						boxSize='80px'
						objectFit='cover'
						src={product.image}
						alt={product.name}
						onClick={() => watchlistOnClose()}
						cursor='pointer'
					/>
				</Link>
				<Box ml='4' w='100%'>
					<Heading fontSize='lg' fontWeight='semibold' mb='2' variant='product'>
						{product.name}
					</Heading>
					<Heading fontSize='lg' fontWeight='semibold' variant='product'>
						{formatCurrency(product.price)}
					</Heading>
				</Box>
				<Box display='flex' flexDir='column'>
					<Button size='sm' onClick={() => buyNow(product)} variant='primary'>
						Buy Now
					</Button>
					<Button
						size='sm'
						my='2'
						variant='negative'
						onClick={() => toggleUserWatchlist(product._id)}
					>
						Remove
					</Button>
				</Box>
			</Box>
			{toggleWatchlistError && <ErrorMessage error={toggleWatchlistError} />}
		</>
	);
}
