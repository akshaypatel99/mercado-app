import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang='en'>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='true'
					/>
					<link
						href='https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300;400;600;700&family=Oleo+Script&family=Rambla:wght@400;700&display=swap'
						rel='stylesheet'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/logo.svg'
						type='image/svg+xml'
					/>
					<link
						rel='icon'
						href='/logo.svg'
						sizes='any'
						type='image/svg+xml'
					></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
