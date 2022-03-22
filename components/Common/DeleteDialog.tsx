import { useRef } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	Text,
} from '@chakra-ui/react';

type DeleteDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	heading: string;
	handleDelete: (id: string) => void;
	id: string;
};

export default function DeleteDialog({
	isOpen,
	onClose,
	heading,
	handleDelete,
	id,
}: DeleteDialogProps) {
	const cancelRef = useRef();

	return (
		<>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete {heading}
						</AlertDialogHeader>

						<AlertDialogBody fontWeight='semibold'>
							<Text mb='2'>
								Delete {heading} #{id}?
							</Text>
							<Text>
								Are you sure? You can&apos;t undo this action afterwards.
							</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button colorScheme='yellow' ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={() => handleDelete(id)} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
