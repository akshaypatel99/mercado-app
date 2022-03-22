import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Icon,
	Heading,
	Text,
} from '@chakra-ui/react';
import { FiCheck, FiFile } from 'react-icons/fi';
import { UpdatedProductType } from './EditProduct';

type ImageSrc = string | ArrayBuffer;

type ImageUploadModalProps = {
	isOpen: boolean;
	onClose: () => void;
	updatedProduct: UpdatedProductType;
	setUpdatedProduct: React.Dispatch<React.SetStateAction<UpdatedProductType>>;
};

const UPLOAD_PHOTO = gql`
	mutation UploadPhoto($file: Upload!) {
		uploadPhoto(file: $file) {
			message
			publicId
			url
		}
	}
`;

export default function ImageUploadModal({
	isOpen,
	onClose,
	updatedProduct,
	setUpdatedProduct,
}: ImageUploadModalProps) {
	const [imageSrc, setImageSrc] = useState<ImageSrc>();
	const [imageAlt, setImageAlt] = useState<string>();
	const [uploadPhoto, { data, loading, error, reset }] =
		useMutation(UPLOAD_PHOTO);

	const handleOnChange = (changeEvent) => {
		const reader = new FileReader();

		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target.result);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
		setImageAlt(changeEvent.target.files[0].name);
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const fileInput: HTMLInputElement =
			form.querySelector('input[type="file"]');
		const file: File = fileInput.files[0];
		const { data } = await uploadPhoto({ variables: { file } });
		setUpdatedProduct({
			...updatedProduct,
			image: data.uploadPhoto.url,
		});
		setTimeout(() => {
			clearImage();
			onClose();
		}, 5000);
	};

	const clearImage = () => {
		setImageSrc(undefined);
		setImageAlt(undefined);
		reset();
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading fontSize='2xl' variant='light'>
							Upload Product Image
						</Heading>
					</ModalHeader>
					<ModalCloseButton color='brand.white' mt='1' />
					<ModalBody justifyContent='center' minH='250' maxH='80%'>
						<form
							method='post'
							onChange={handleOnChange}
							onSubmit={handleOnSubmit}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<FormControl display='flex' flexDir='column' padding='1rem'>
								<FormLabel htmlFor='file' mb='0' color='brand.700'>
									Select a product image to upload.
								</FormLabel>
								<input
									type='file'
									name='file'
									multiple={false}
									accept='image/webp,image/png,image/jpeg'
									style={{
										padding: '1rem',
										border: 'solid 1px #a7cbd8',
										borderRadius: '0.5rem',
										color: '#0e323f',
									}}
								/>
								<FormHelperText fontSize='sm' color='brand.700'>
									Must be jpeg, png or webp format.
								</FormHelperText>

								{typeof imageSrc === 'string' && (
									<Image
										src={imageSrc}
										alt={imageAlt}
										maxH='200px'
										maxW='200px'
										margin={'0% auto'}
									/>
								)}

								{error && <FormErrorMessage>{error.message}</FormErrorMessage>}

								{data && data.uploadPhoto.message && (
									<Text>{data.uploadPhoto.message}</Text>
								)}

								{imageSrc && (
									<Button
										leftIcon={
											data && data.uploadPhoto.publicId ? (
												<Icon as={FiCheck} />
											) : (
												<Icon as={FiFile} />
											)
										}
										justifyContent='center'
										type='submit'
										variant='primary'
										isLoading={loading}
										disabled={loading || data?.uploadPhoto?.publicId}
									>
										{data && data.uploadPhoto.publicId ? 'Success' : 'Upload'}
									</Button>
								)}
							</FormControl>
						</form>
					</ModalBody>

					<ModalFooter justifyContent='space-between'>
						<Button onClick={() => clearImage()} variant='negative'>
							Clear Image
						</Button>
						<Button colorScheme='yellow' onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
