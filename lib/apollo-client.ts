import {
	ApolloClient,
	from,
	InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import uri from './env-config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
	uri,
	credentials: 'include',
});

const cache = new InMemoryCache({
	typePolicies: {
		User: {
			fields: {
				userWatchList: {
					merge: false,
				},
			},
		},
	},
});

const client = new ApolloClient({
	cache,
	link: from([errorLink, uploadLink]),
});

export default client;