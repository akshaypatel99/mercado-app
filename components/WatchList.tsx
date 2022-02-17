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

export default function WatchList() {
	const { isOpen, onOpen, onClose, watchListState, watchListDispatch } =
		useContext(WatchListContext);
	const btnRef = React.useRef();

	return (
		<>
			<Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
				Open
			</Button>
			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Shopping WatchList</DrawerHeader>

					<DrawerBody>{/* Map out watchList items */}</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='yellow'>Clear WatchList</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
