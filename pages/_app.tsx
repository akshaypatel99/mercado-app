import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../context/AuthContext';
import { CheckoutProvider } from '../context/CheckoutContext';
import { WatchlistProvider } from '../context/WatchlistReactContext';
import client from '../lib/apollo-client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Common/Page';
import theme from '../styles/theme';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider resetCSS theme={theme}>
				<AuthProvider>
					<CheckoutProvider>
						<WatchlistProvider>
							<Page>
								<Component {...pageProps} />
							</Page>
						</WatchlistProvider>
					</CheckoutProvider>
				</AuthProvider>
			</ChakraProvider>
		</ApolloProvider>
	);
}
export default MyApp;
