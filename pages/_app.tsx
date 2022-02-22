import type { AppProps } from 'next/app';
import {
	ApolloClient,
	from,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import { WatchListProvider } from '../context/WatchListContext';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import theme from '../styles/theme';

import '@fontsource/martel-sans/300.css';
import '@fontsource/martel-sans/400.css';
import '@fontsource/martel-sans/600.css';
import '@fontsource/martel-sans/700.css';
import '@fontsource/rambla/400.css';
import '@fontsource/rambla/700.css';
import '@fontsource/oleo-script/400.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
	uri: '/api/graphql',
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

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider resetCSS theme={theme}>
				<AuthProvider>
					<WatchListProvider>
						<Page>
							<Component {...pageProps} />
						</Page>
					</WatchListProvider>
				</AuthProvider>
			</ChakraProvider>
		</ApolloProvider>
	);
}
export default MyApp;
