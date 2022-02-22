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
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader fontFamily='heading' fontSize='2xl'>
					My Watch List
				</DrawerHeader>

				<DrawerBody>
					<WatchListContent />
				</DrawerBody>

				<DrawerFooter>
					<Button variant='outline' mr={3} onClick={() => watchListOnClose()}>
						Close
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
