import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
	Button,
	Center,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Icon,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';

const UPLOAD_PHOTO = gql`
	mutation UploadPhoto($file: Upload!) {
		uploadPhoto(file: $file) {
			publicId
			url
		}
	}
`;

type ImageSrc = string | ArrayBuffer;

export default function ImageUploadModal({ isOpen, onClose, setProductInfo }) {
	const [imageSrc, setImageSrc] = useState<ImageSrc>();
	const [imageAlt, setImageAlt] = useState<string>();
	const [uploadData, setUploadData] = useState<FormData>();
	const [uploadPhoto, { data, loading, error }] = useMutation(UPLOAD_PHOTO);

	const handleOnChange = (changeEvent) => {
		const reader = new FileReader();

		reader.onload = function (onLoadEvent) {
			setImageSrc(onLoadEvent.target.result);
			setUploadData(undefined);
		};

		reader.readAsDataURL(changeEvent.target.files[0]);
		setImageAlt(changeEvent.target.files[0].name);
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const fileInput = form.querySelector('input[type="file"]');
		const file = fileInput.files[0];
		const formData = new FormData();
		formData.append('file', file);
		setUploadData(formData);
		// const {data} = await uploadPhoto({ variables: { file: uploadData } });
		// setProductInfo({ ...productInfo, image: data.uploadPhoto.url });
	};

	const clearImage = () => {
		setImageSrc(undefined);
		setImageAlt(undefined);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload Product Image</ModalHeader>
					<ModalCloseButton />
					<ModalBody justifyContent='center' minH='200' maxH='80%'>
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
							<input
								type='file'
								name='file'
								style={{
									padding: '1rem',
									border: 'solid 1px gray',
									borderRadius: '0.5rem',
									marginTop: '1rem',
								}}
							/>

							{typeof imageSrc === 'string' && (
								<Image src={imageSrc} alt={imageAlt} maxH='200px' />
							)}

							{imageSrc && !uploadData && (
								<Button
									leftIcon={<Icon as={FiFile} />}
									justifyContent='center'
									type='submit'
								>
									Upload
								</Button>
							)}

							{uploadData && (
								<code>
									<pre>{JSON.stringify(uploadData, null, 2)}</pre>
								</code>
							)}
						</form>
					</ModalBody>

					<ModalFooter justifyContent='space-between'>
						<Button onClick={() => clearImage()}>Clear Image</Button>
						<Button colorScheme='teal' onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
