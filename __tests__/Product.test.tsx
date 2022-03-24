import { render } from '@testing-library/react';
import Product from '../components/Product/Product';
import { fakeProduct, fakeUser } from '../lib/testUtils';

describe('<Product />', () => {
	it('renders the Product component on the Product [id] page', () => {
		const { getByText, getByRole } = render(
			<Product product={fakeProduct()} user={fakeUser()} />
		);

		expect(getByText('Test product')).toBeInTheDocument();
		expect(getByText('£1,234.56')).toBeInTheDocument();
		expect(getByText('Test category')).toBeInTheDocument();
		expect(getByText('New')).toBeInTheDocument();
		expect(getByRole('img', { name: 'Test product' })).toBeInTheDocument();
	});
});
