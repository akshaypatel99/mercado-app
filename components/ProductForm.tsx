import { Dispatch, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
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
import ImageUploadModal from './ImageUploadModal';

const schema = z.object({
	name: z
		.string()
		.min(5, { message: 'Required. Must be at least 5 characters.' })
		.max(50),
	description: z
		.string()
		.min(5, { message: 'Required. Must be at least 5 characters.' })
		.max(500),
	price: z.union([
		z.string().regex(/^[1-9]\d*(\.\d+)?$/, { message: 'Must be a number.' }),
		z.number().nonnegative({ message: 'Must be positive' }),
	]),
	image: z.string().max(500),
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

type Product = {
	name: string;
	description: string;
	image: string;
	category: string;
	price: number;
};

type ProductFormProps = {
	product?: Product;
	mutationFn: () => {};
	updatedProduct?: Product;
	setUpdatedProduct: Dispatch<any>;
};

export default function ProductForm({
	product,
	mutationFn,
	updatedProduct,
	setUpdatedProduct,
}: ProductFormProps) {
	const [productInfo, setProductInfo] = useState(product);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ mode: 'onTouched', resolver: zodResolver(schema) });

	return (
		<>
			<form onSubmit={handleSubmit(mutationFn)}>
				<FormControl mt='6' isInvalid={errors.name}>
					<FormLabel htmlFor='name'>Product name</FormLabel>
					<Input
						id='name'
						{...register('name')}
						defaultValue={productInfo ? productInfo.name : ''}
						onChange={(e) =>
							setUpdatedProduct({
								...updatedProduct,
								name: e.target.value,
							})
						}
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
						defaultValue={productInfo ? productInfo.description : ''}
						onChange={(e) =>
							setUpdatedProduct({
								...updatedProduct,
								description: e.target.value,
							})
						}
					/>
					<FormErrorMessage>
						{errors.description?.message && (
							<p>{errors.description?.message}</p>
						)}
					</FormErrorMessage>
				</FormControl>
				<FormControl mt='6' isInvalid={errors.category}>
					<FormLabel htmlFor='category'>Category</FormLabel>
					<Select
						id='category'
						placeholder='Select category'
						defaultValue={productInfo ? productInfo.category : ''}
						{...register('category')}
						onChange={(e) =>
							setUpdatedProduct({
								...updatedProduct,
								category: e.target.value,
							})
						}
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
						defaultValue={productInfo ? productInfo.price : 0}
						min={0}
						precision={2}
						step={1.0}
						allowMouseWheel
						onChange={(event) =>
							setUpdatedProduct({
								...updatedProduct,
								price: parseFloat(event),
							})
						}
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
						isReadOnly
						id='image'
						{...register('image')}
						value={updatedProduct ? updatedProduct.image : ''}
						onChange={(e) =>
							setUpdatedProduct({
								...updatedProduct,
								image: e.target.value,
							})
						}
					/>
					<FormErrorMessage>
						{errors.image?.message && <p>{errors.image?.message}</p>}
					</FormErrorMessage>
					<Button mt='4' onClick={onOpen}>
						Upload Image
					</Button>
				</FormControl>

				<Button
					mt={8}
					colorScheme='teal'
					isLoading={isSubmitting}
					type='submit'
				>
					Submit
				</Button>

				<Button
					mt={8}
					ml={4}
					colorScheme='yellow'
					type='reset'
					onClick={() => setUpdatedProduct(productInfo)}
				>
					Reset
				</Button>
			</form>
			<ImageUploadModal
				onClose={onClose}
				isOpen={isOpen}
				updatedProduct={updatedProduct}
				setUpdatedProduct={setUpdatedProduct}
			/>
		</>
	);
}
