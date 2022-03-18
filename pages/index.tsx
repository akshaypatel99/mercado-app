import {
	Box,
	Center,
	Container,
	Flex,
	Grid,
	Heading,
	Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
	return (
		<Box w='100%' mx='auto'>
			<Box position='relative'>
				<Flex
					position='relative'
					zIndex={1}
					bgColor='rgba(20, 74, 94, 0.5)'
					width='100%'
					minH='calc(100vh - 64px)'
					alignItems='center'
					justifyContent='center'
				>
					<Container maxW='container.xl' display='grid' textAlign='center'>
						<Heading
							as='h1'
							fontSize={['6xl', 'null', '7xl', '8xl']}
							variant='light'
							py={['8', null, '12', '16']}
							mb={['8', null, '12', '16']}
						>
							Welcome to Mercado
						</Heading>
						<NextLink href='/products' passHref>
							<Link
								w='40%'
								mx='auto'
								color='brand.white'
								border='1px solid'
								borderRadius='lg'
								borderColor='brand.white'
								fontSize={['md', 'lg', null, 'xl']}
								fontWeight='bold'
								py='5'
								textTransform='uppercase'
								_hover={{
									textDecoration: 'none',
									bgColor: 'rgba(255, 255, 255, 0.4)',
								}}
							>
								Shop Now
							</Link>
						</NextLink>
					</Container>
				</Flex>
				<Box
					position='absolute'
					top={0}
					display='flex'
					overflow='hidden'
					zIndex={0}
					width='100%'
					height='100%'
				>
					<Box overflow='hidden' width='100%'>
						<video
							autoPlay
							loop
							muted
							playsInline
							disableRemotePlayback
							style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						>
							<source src='/images/mercado.mp4' type='video/mp4' />
						</video>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
