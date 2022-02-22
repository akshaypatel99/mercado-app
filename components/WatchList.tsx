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
	const {
		watchListIsOpen,
		watchListOnOpen,
		watchListOnClose,
		watchListState,
		watchListDispatch,
	} = useContext(WatchListContext);
	const btnRef = React.useRef();

	return (
		<>
			<Drawer
				isOpen={watchListIsOpen}
				placement='right'
				onClose={() => watchListOnClose()}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader fontFamily='heading'>My Watch List</DrawerHeader>

					<DrawerBody>{/* Map out watchList items */}</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={() => watchListOnClose()}>
							Cancel
						</Button>
						<Button colorScheme='yellow'>Clear WatchList</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
