import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Product from '../components/Product/Product';
import {
	fakeAdminUser,
	fakeProduct,
	fakeProductCreator,
	fakeUser,
} from '../lib/testUtils';

const product = fakeProduct();
const user = fakeUser();
const adminUser = fakeAdminUser();
const productCreator = fakeProductCreator();

describe('<Product />', () => {
	it('renders the product name, price, description and watchedBy on the Product [id] page', () => {
		const { getByText } = render(
			<MockedProvider>
				<Product product={product} user={user} />
			</MockedProvider>
		);

		const name = 'Test product';
		const price = '£1,234.56';
		const description = 'This is a test product';
		const watchedBy = 'Watched By: 1 person';
		const category = 'Other';

		expect(getByText(name)).toBeInTheDocument();
		expect(getByText(price)).toBeInTheDocument();
		expect(getByText(description)).toBeInTheDocument();
		expect(getByText(watchedBy)).toBeInTheDocument();
		expect(getByText(category)).toBeInTheDocument();
	});

	it('renders the image properly', () => {
		const { getByAltText } = render(
			<MockedProvider>
				<Product product={product} user={user} />
			</MockedProvider>
		);

		expect(getByAltText(product.name)).toBeInTheDocument();
	});

	it('renders the seller name', () => {
		const { getByText } = render(
			<MockedProvider>
				<Product product={product} user={user} />
			</MockedProvider>
		);

		expect(getByText(`Seller: ${product.user.name}`)).toBeInTheDocument();
	});

	it('renders <ProductCustomerOptions /> Buy Now and Add to Watchlist buttons for USER level', () => {
		const { getByRole } = render(
			<MockedProvider>
				<Product product={product} user={user} />
			</MockedProvider>
		);

		expect(getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
		expect(
			getByRole('button', { name: 'Add to Watchlist' })
		).toBeInTheDocument();
	});

	it('renders <ProductCustomerOptions /> Buy Now and Add to Watchlist buttons if User === null', () => {
		const { getByRole } = render(
			<MockedProvider>
				<Product product={product} user={null} />
			</MockedProvider>
		);

		expect(getByRole('button', { name: 'Buy Now' })).toBeInTheDocument();
		expect(
			getByRole('button', { name: 'Add to Watchlist' })
		).toBeInTheDocument();
	});

	it('renders <EditProduct /> for ADMIN level', () => {
		const { getByRole } = render(
			<MockedProvider>
				<Product product={product} user={adminUser} />
			</MockedProvider>
		);

		expect(getByRole('heading', { name: /edit product/i })).toBeInTheDocument();
		expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
		expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
	});

	it('renders <EditProduct /> for ProductCreator at USER level', () => {
		const { getByRole } = render(
			<MockedProvider>
				<Product product={product} user={productCreator} />
			</MockedProvider>
		);

		expect(getByRole('heading', { name: /edit product/i })).toBeInTheDocument();
		expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
		expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
	});
});
