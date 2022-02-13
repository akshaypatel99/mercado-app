import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Icon,
	Image,
	Input,
	Select,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import ImageModal from './ImageModal';

const schema = z.object({
	name: z
		.string()
		.min(5, { message: 'Required. Must be at least 5 characters.' })
		.max(50),
	description: z
		.string()
		.min(5, { message: 'Required. Must be at least 5 characters.' })
		.max(200),
	price: z.union([
		z.string().regex(/^[1-9]\d*(\.\d+)?$/, { message: 'Must be a number.' }),
		z.number().nonnegative({ message: 'Must be positive' }),
	]),
	image: z.string().nonempty({ message: 'Required ' }).max(500),
	category: z.enum([
		'Clothing',
		'Electronics',
		'Jewellery',
		'Accessories',
		'Musical Instruments',
		'Furniture',
		'Sports',
		'Books',
		'Other',
	]),
});

type FormValues = {
	imageFile: FileList;
};

export default function ProductForm({ product }) {
	const [productInfo, setProductInfo] = useState(product);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imageSrc, setImageSrc] = useState();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });

	console.log(errors);

	const validateFiles = (value: FileList) => {
		if (value.length < 1) {
			return 'Files is required';
		}
		for (const file of Array.from(value)) {
			const fsMb = file.size / (1024 * 1024);
			const MAX_FILE_SIZE = 5;
			if (fsMb > MAX_FILE_SIZE) {
				return 'Max file size 5mb';
			}
		}
		return true;
	};

	function onSubmit(values: FormValues) {
		return new Promise((resolve) => {
			setTimeout(() => {
				alert(JSON.stringify(values, null, 2));
				resolve(values);
			}, 3000);
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl mt='6' isInvalid={errors.name}>
				<FormLabel htmlFor='name'>Product name</FormLabel>
				<Input
					id='name'
					{...register('name')}
					defaultValue={productInfo.name}
				/>
				<FormErrorMessage>
					{errors.name?.message && <p>{errors.name?.message}</p>}
				</FormErrorMessage>
			</FormControl>
			<FormControl mt='6' isInvalid={errors.description}>
				<FormLabel htmlFor='description'>Description</FormLabel>
				<Textarea
					id='description'
					{...register('description')}
					defaultValue={productInfo.description}
				/>
				<FormErrorMessage>
					{errors.description?.message && <p>{errors.description?.message}</p>}
				</FormErrorMessage>
			</FormControl>
			<FormControl mt='6' isInvalid={errors.category}>
				<FormLabel htmlFor='category'>Category</FormLabel>
				<Select
					id='category'
					placeholder='Select category'
					defaultValue={productInfo.category}
					{...register('category')}
				>
					<option value='Clothing'>Clothing</option>
					<option value='Electronics'>Electronics</option>
					<option value='Jewellery'>Jewellery</option>
					<option value='Accessories'>Accessories</option>
					<option value='Musical Instruments'>Musical Instruments</option>
					<option value='Furniture'>Furniture</option>
					<option value='Sports'>Sports</option>
					<option value='Books'>Books</option>
					<option value='Other'>Other</option>
				</Select>
				<FormErrorMessage>
					{errors.category?.message && <p>{errors.category?.message}</p>}
				</FormErrorMessage>
			</FormControl>
			<FormControl mt='6' isInvalid={errors.price}>
				<FormLabel htmlFor='price'>Price</FormLabel>
				<NumberInput
					id='price'
					defaultValue={productInfo.price}
					min={0}
					precision={2}
					step={0.2}
					allowMouseWheel
				>
					<NumberInputField {...register('price')} />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<FormErrorMessage>
					{errors.price?.message && <p>{errors.price?.message}</p>}
				</FormErrorMessage>
			</FormControl>
			<FormControl mt='6' isInvalid={errors.image}>
				<FormLabel htmlFor='image'>Image</FormLabel>
				<Input
					id='image'
					{...register('image')}
					defaultValue={productInfo.image}
				/>
				<FormErrorMessage>
					{errors.image?.message && <p>{errors.image?.message}</p>}
				</FormErrorMessage>
				<Button onClick={onOpen}>Upload Image</Button>
				<ImageModal onClose={onClose} isOpen={isOpen} />
			</FormControl>
			{/* <FormControl mt='6' isInvalid={!!errors.image} isRequired>
				<FormLabel htmlFor='imageFile'>Image upload</FormLabel>
				<ImageUpload
					id='imageFile'
					accept={'image/*'}
					multiple={false}
					register={register('imageFile', { validate: validateFiles })}
				>
					<Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
				</ImageUpload>
				<Image src={imageSrc} alt={imageSrc} />
			</FormControl> */}

			<Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
				Submit
			</Button>
		</form>
	);
}
