import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import EditProduct, { UPDATE_PRODUCT } from '../components/Product/EditProduct';
import { fakeProduct } from '../lib/testUtils';

const product = fakeProduct();

const updatedDescription = 'Updated test product description';
const updatedPrice = '12345.67';
const updatedImage = 'https://test.com/image.jpg';

describe('<EditProduct />', () => {
	it('renders the component without error', () => {
		const { getByRole } = render(
			<MockedProvider>
				<EditProduct product={product} />
			</MockedProvider>
		);

		expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
	});

	it('handles updating input values', async () => {
		const { getByDisplayValue, getByText, getByRole, debug } = render(
			<MockedProvider>
				<EditProduct product={product} />
			</MockedProvider>
		);

		expect(getByDisplayValue(product.name)).toBeInTheDocument();
		expect(getByDisplayValue(product.description)).toBeInTheDocument();
		expect(getByDisplayValue(product.price.toString())).toBeInTheDocument();
		expect(getByDisplayValue(product.category)).toBeInTheDocument();
		expect(getByDisplayValue(product.image)).toBeInTheDocument();

		userEvent.clear(screen.getByRole('textbox', { name: /description/i }));
		userEvent.type(
			screen.getByRole('textbox', { name: /description/i }),
			updatedDescription
		);
		userEvent.clear(screen.getByRole('spinbutton', { name: /price/i }));
		userEvent.type(
			screen.getByRole('spinbutton', { name: /price/i }),
			updatedPrice.toString()
		);
		userEvent.clear(screen.getByRole('textbox', { name: /image/i }));
		userEvent.type(
			screen.getByRole('textbox', { name: /image/i }),
			updatedImage
		);

		expect(getByDisplayValue(product.name)).toBeInTheDocument();
		expect(getByDisplayValue(updatedDescription)).toBeInTheDocument();
		expect(getByDisplayValue(updatedPrice.toString())).toBeInTheDocument();
		expect(getByDisplayValue(product.category)).toBeInTheDocument();
		expect(getByDisplayValue(updatedImage)).toBeInTheDocument();
	});

	it('handles creating a product', async () => {
		const mocks = [
			{
				request: {
					query: UPDATE_PRODUCT,
					variables: {
						updateProductId: product._id,
						input: {
							name: product.name,
							description: updatedDescription,
							image: product.image,
							category: product.category,
							price: product.price,
						},
					},
				},
				result: {
					data: {
						updateProduct: {
							message: 'Product updated successfully',
							product: {
								...product,
								_id: 'createdProductId',
							},
						},
					},
				},
			},
		];

		const { getByText, getByRole, debug } = render(
			<MockedProvider mocks={mocks}>
				<EditProduct product={product} />
			</MockedProvider>
		);

		await userEvent.clear(
			screen.getByRole('textbox', { name: /description/i })
		);
		await userEvent.type(
			screen.getByRole('textbox', { name: /description/i }),
			updatedDescription
		);

		await userEvent.click(
			screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement
		);
		await waitFor(() => {
			expect(getByText('Product updated successfully')).toBeInTheDocument();
		});
	});
});
