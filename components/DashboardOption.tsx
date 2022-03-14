import { Box, Center, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function AccountOption({
	heading,
	imageUrl,
	href,
}: {
	heading: string;
	imageUrl?: string;
	href: string;
}) {
	let linkBoxStyles: {};
	let boxStyles: {};

	if (imageUrl) {
		linkBoxStyles = {
			backgroundImage: `url('/images/${imageUrl}')`,
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		};
		boxStyles = {
			backgroundColor: 'none',
			backdropFilter: 'auto',
			backdropContrast: '85%',
			backdropBlur: '3px',
			backgroundGradient:
				'linear-gradient(to bottom, rgba(0,0,0,0.0) 50%, rgba(20, 74, 94, 0.4) 100%)',
			_hover: {
				backgroundColor: 'none',
				backdropContrast: '100%',
				backdropBlur: '0px',
			},
		};
	}

	return (
		<LinkBox
			borderRadius='lg'
			w='lg'
			h='xs'
			cursor='pointer'
			boxShadow='md'
			bgColor='brand.600'
			_hover={{ backgroundColor: 'brand.green' }}
			{...linkBoxStyles}
		>
			<NextLink href={`/${href}`} passHref>
				<LinkOverlay>
					<Box
						borderRadius='lg'
						boxSize='full'
						display='flex'
						alignItems='flex-end'
						p='6'
						{...boxStyles}
					>
						<Heading fontSize='3xl' variant='light'>
							{heading}
						</Heading>
					</Box>
				</LinkOverlay>
			</NextLink>
		</LinkBox>
	);
}
