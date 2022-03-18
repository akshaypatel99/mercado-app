import React, { useContext } from 'react';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Heading,
} from '@chakra-ui/react';
import { WatchlistContext } from '../../context/WatchlistReactContext';
import WatchlistContent from './WatchlistDrawerContent';

export default function Watchlist() {
	const { watchlistIsOpen, watchlistOnClose } = useContext(WatchlistContext);

	const btnRef = React.useRef();

	return (
		<Drawer
			isOpen={watchlistIsOpen}
			placement='right'
			onClose={() => watchlistOnClose()}
			finalFocusRef={btnRef}
			size='md'
		>
			<DrawerOverlay />
			<DrawerContent bg='brand.50'>
				<DrawerCloseButton color='brand.white' mt='1' />
				<DrawerHeader>
					<Heading fontSize='2xl' variant='light'>
						Watchlist
					</Heading>
				</DrawerHeader>

				<DrawerBody>
					<WatchlistContent />
				</DrawerBody>

				<DrawerFooter borderTop='1px solid' borderColor='brand.150'>
					<Button
						variant='secondary'
						width='100%'
						m='auto'
						onClick={() => watchlistOnClose()}
					>
						Close
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
