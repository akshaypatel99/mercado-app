import { Center, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function DashboardOption({
	heading,
	imageUrl,
	href,
}: {
	heading: string;
	imageUrl?: string;
	href: string;
}) {
	return (
		<LinkBox
			borderRadius='lg'
			w='xs'
			h='xs'
			cursor='pointer'
			boxShadow='md'
			bgColor='brand.300'
			backgroundImage={imageUrl ? `url('/images/${imageUrl}')` : undefined}
			backgroundPosition='center'
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
			justifySelf={'center'}
		>
			<Center
				borderRadius='lg'
				boxSize='full'
				backdropFilter='auto'
				backdropContrast='100%'
				bgColor='rgba(20, 74, 94, 0.5)'
				_hover={{
					backgroundColor: 'rgba(20, 74, 94, 0.8)',
				}}
			>
				<NextLink href={`/${href}`} passHref>
					<LinkOverlay>
						<Heading fontSize='3xl' variant='light'>
							{heading}
						</Heading>
					</LinkOverlay>
				</NextLink>
			</Center>
		</LinkBox>
	);
}
