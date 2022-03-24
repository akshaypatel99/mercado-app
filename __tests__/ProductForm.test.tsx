import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import ProductForm from '../components/Product/ProductForm';
import { fakeProduct } from '../lib/testUtils';

const product = fakeProduct();

const formProps = {
	mutationFn: jest.fn(),
	setUpdatedProduct: jest.fn(),
	updatedProduct: {
		name: '',
		description: '',
		image: '',
		category: '',
		price: 0,
	},
};

describe('<ProductForm />', () => {
	it('renders the component without error', () => {
		const { getByRole } = render(
			<MockedProvider>
				<ProductForm {...formProps} />
			</MockedProvider>
		);

		expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
	});

	it('handles updating input values', async () => {
		const { getByDisplayValue, getByText, getByRole, debug } = render(
			<MockedProvider>
				<ProductForm {...formProps} />
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

		expect(getByDisplayValue(product.name)).toBeInTheDocument();
		expect(getByDisplayValue(product.description)).toBeInTheDocument();
		expect(getByDisplayValue(product.price.toString())).toBeInTheDocument();
		expect(getByDisplayValue(product.category)).toBeInTheDocument();
	});
});
