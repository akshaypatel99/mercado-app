import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import CreateProduct, {
	CREATE_PRODUCT,
} from '../components/Product/CreateProduct';
import { fakeProduct } from '../lib/testUtils';

const product = fakeProduct();

describe('<CreateProduct />', () => {
	it('renders the component without error', () => {
		const { getByRole } = render(
			<MockedProvider>
				<CreateProduct />
			</MockedProvider>
		);

		expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
	});

	it('handles updating input values', async () => {
		const { getByDisplayValue, getByText, getByRole, debug } = render(
			<MockedProvider>
				<CreateProduct />
			</MockedProvider>
		);

		userEvent.type(screen.getByLabelText(/name/i), product.name);
		userEvent.type(screen.getByLabelText(/description/i), product.description);
		userEvent.type(
			screen.getByRole('spinbutton', {
				name: /price/i,
			}),
			product.price.toString()
		);
		userEvent.selectOptions(
			screen.getByLabelText(/category/i),
			product.category
		);
		userEvent.type(
			screen.getByRole('textbox', { name: /image/i }),
			product.image
		);

		expect(getByDisplayValue(product.name)).toBeInTheDocument();
		expect(getByDisplayValue(product.description)).toBeInTheDocument();
		expect(getByDisplayValue(product.price.toString())).toBeInTheDocument();
		expect(getByDisplayValue(product.category)).toBeInTheDocument();
		expect(getByDisplayValue(product.image)).toBeInTheDocument();
	});

	it('handles creating a product', async () => {
		const mocks = [
			{
				request: {
					query: CREATE_PRODUCT,
					variables: {
						input: {
							name: product.name,
							description: product.description,
							image: product.image,
							category: product.category,
							price: product.price,
						},
					},
				},
				result: {
					data: {
						createProduct: {
							message: 'Product created successfully',
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
				<CreateProduct />
			</MockedProvider>
		);

		userEvent.type(screen.getByLabelText(/name/i), product.name);
		userEvent.type(screen.getByLabelText(/description/i), product.description);
		userEvent.type(
			screen.getByRole('spinbutton', {
				name: /price/i,
			}),
			product.price.toString()
		);
		userEvent.selectOptions(
			screen.getByLabelText(/category/i),
			product.category
		);
		userEvent.type(
			screen.getByRole('textbox', { name: /image/i }),
			product.image
		);

		await userEvent.click(
			screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement
		);

		await waitFor(() => {
			expect(getByText('Product created successfully')).toBeInTheDocument();
		});
	});
});
