import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductCustomerOptions from '../components/Product/ProductCustomerOptions';
import { fakeProduct } from '../lib/testUtils';

const product = fakeProduct();

describe('<ProductCustomerOptions />', () => {
	it('renders Buy Now and `Add To Watchlist buttons without error', () => {
		const { getByRole } = render(
			<MockedProvider>
				<ProductCustomerOptions product={product} />
			</MockedProvider>
		);

		expect(getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
		expect(
			getByRole('button', { name: 'Add to Watchlist' })
		).toBeInTheDocument();
	});

	it('if Product has been sold the Buy Now button is disabled ', () => {
		const soldProduct = {
			...product,
			isSold: true,
		};

		const { getByRole } = render(
			<MockedProvider>
				<ProductCustomerOptions product={soldProduct} />
			</MockedProvider>
		);

		expect(getByRole('button', { name: 'Buy Now' })).toHaveAttribute(
			'disabled'
		);
	});

	it('displays Policy component', () => {
		const { getByText } = render(
			<MockedProvider>
				<ProductCustomerOptions product={product} />
			</MockedProvider>
		);

		expect(getByText(/3%/i)).toBeInTheDocument();
		expect(getByText(/£3.95/i)).toBeInTheDocument();
		expect(getByText(/Stripe/i)).toBeInTheDocument();
	});
});
