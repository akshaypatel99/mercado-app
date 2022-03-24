import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Nav from '../components/Common/Nav';
import { fakeUser, fakeAdminUser } from '../lib/testUtils';
import { AuthProvider } from '../context/AuthContext';
import { CURRENT_USER } from '../hooks/useCurrentUser';

const user = fakeUser();
const adminUser = fakeAdminUser();

const signedInMocks = [
	{
		request: {
			query: CURRENT_USER,
		},
		result: {
			data: {
				currentUser: {
					...user,
				},
			},
		},
	},
];

const signedOutMocks = [
	{
		request: {
			query: CURRENT_USER,
		},
		result: {
			data: {
				currentUser: {
					user: null,
				},
			},
		},
	},
];

const signedInAdminMocks = [
	{
		request: {
			query: CURRENT_USER,
		},
		result: {
			data: {
				currentUser: {
					...adminUser,
				},
			},
		},
	},
];

describe('<Nav />', () => {
	it('renders the component without error', () => {
		const { getByText } = render(
			<MockedProvider>
				<Nav />
			</MockedProvider>
		);

		expect(getByText(/buy/i)).toBeInTheDocument();
		expect(getByText(/sell/i)).toBeInTheDocument();
		expect(getByText(/account/i)).toBeInTheDocument();
		expect(getByText(/watchlist/i)).toBeInTheDocument();
	});

	it('displays Login when no user found', () => {
		const { getByText } = render(
			<MockedProvider mocks={signedOutMocks}>
				<Nav />
			</MockedProvider>
		);

		expect(getByText(/login/i)).toBeInTheDocument();
	});

	it('displays User name when user found', async () => {
		const { getByText } = render(
			<MockedProvider mocks={signedInMocks}>
				<AuthProvider>
					<Nav />
				</AuthProvider>
			</MockedProvider>
		);

		await waitFor(() => {
			expect(getByText(/Test/i)).toBeInTheDocument();
		});
	});

	it('displays Admin option in dropdown menu when admin user found', async () => {
		const { getByText } = render(
			<MockedProvider mocks={signedInAdminMocks}>
				<AuthProvider>
					<Nav />
				</AuthProvider>
			</MockedProvider>
		);

		await waitFor(() => {
			expect(getByText(/admin/i)).toBeInTheDocument();
		});
	});
});
