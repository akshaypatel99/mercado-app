import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function AccountOption({
	heading,
	imageUrl,
	href,
}: {
	heading: string;
	imageUrl: string;
	href: string;
}) {
	return (
		<LinkBox
			borderRadius='lg'
			w='lg'
			h='xs'
			cursor='pointer'
			backgroundImage={`url('/images/${imageUrl}')`}
			backgroundPosition='center'
			backgroundRepeat='no-repeat'
			boxShadow='md'
		>
			<NextLink href={`/account/${href}`} passHref>
				<LinkOverlay>
					<Box
						borderRadius='lg'
						boxSize='full'
						backdropFilter='auto'
						backdropContrast='85%'
						backdropBlur='3px'
						bgGradient='linear-gradient(to bottom, rgba(0,0,0,0.0) 50%, rgba(20, 74, 94, 0.4) 100%)'
						_hover={{
							backdropContrast: '100%',
							backdropBlur: '0px',
						}}
						display='flex'
						alignItems='flex-end'
						p='6'
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
