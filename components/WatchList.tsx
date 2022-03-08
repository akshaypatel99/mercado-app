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
import { WatchListContext } from '../context/WatchListContext';
import WatchListContent from './WatchListContent';

export default function WatchList() {
	const { watchListIsOpen, watchListOnClose } = useContext(WatchListContext);

	const btnRef = React.useRef();

	return (
		<Drawer
			isOpen={watchListIsOpen}
			placement='right'
			onClose={() => watchListOnClose()}
			finalFocusRef={btnRef}
			size='md'
		>
			<DrawerOverlay />
			<DrawerContent bg='brand.50'>
				<DrawerCloseButton color='brand.white' mt='1' />
				<DrawerHeader>
					<Heading fontSize='2xl' variant='light'>
						Watch List
					</Heading>
				</DrawerHeader>

				<DrawerBody>
					<WatchListContent />
				</DrawerBody>

				<DrawerFooter borderTop='1px solid' borderColor='brand.150'>
					<Button
						variant='secondary'
						width='100%'
						m='auto'
						onClick={() => watchListOnClose()}
					>
						Close
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
