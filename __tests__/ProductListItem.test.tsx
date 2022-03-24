import { render } from '@testing-library/react';
import ProductListItem from '../components/Product/ProductListItem';
import { fakeProductListItem } from '../lib/testUtils';

const product = fakeProductListItem();

describe('<ProductListItem />', () => {
	it('renders the name, price, category, isNew badge and image', () => {
		const { getByText, getByRole } = render(
			<ProductListItem product={product} />
		);

		expect(getByText('Test product')).toBeInTheDocument();
		expect(getByText('£1,234.56')).toBeInTheDocument();
		expect(getByText('Test category')).toBeInTheDocument();
		expect(getByText('New')).toBeInTheDocument();
		expect(getByRole('img', { name: 'Test product' })).toBeInTheDocument();
	});
});
