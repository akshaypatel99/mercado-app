import { render, screen } from '@testing-library/react';
import BackTo from '../components/Common/BackTo';

describe('BackTo', () => {
	it('renders the name of the page the href links to', () => {
		render(<BackTo text='Test page' href='test' />);
		expect(screen.getByText('Back to Test page')).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: 'Back to Test page' })
		).toHaveAttribute('href', '/test');
	});
});
