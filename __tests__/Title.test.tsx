import { render, screen } from '@testing-library/react';
import Title from '../components/Common/Title';

describe('Title', () => {
	it('renders the title of a page', () => {
		render(<Title title='Test' />);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
