import { Box, Button, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { CheckoutContext } from '../context/CheckoutContext';
import { WatchListContext } from '../context/WatchListContext';
import formatCurrency from '../lib/formatCurrency';
import ErrorMessage from './ErrorMessage';

export default function WatchListItem({ product }) {
	const { watchListOnClose, toggleUserWatchList, toggleWatchListError } =
		useContext(WatchListContext);
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
						onClick={() => watchListOnClose()}
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
