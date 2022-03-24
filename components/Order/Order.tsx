import {
	Flex,
	HStack,
	Image,
	Link,
	LinkBox,
	LinkOverlay,
	Spacer,
	StackDivider,
	Text,
	VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import formatCurrency from '../../lib/formatCurrency';
import { localDate } from '../../lib/localDate';
import Title from '../Common/Title';
import { OrderProps } from '../../pages/order/[id]';

export default function Order({ order, user }: OrderProps) {
	return (
		<>
			<Title title={`Order #${order._id}`} />
			<Flex my='8'>
				<VStack
					w='40%'
					divider={<StackDivider borderColor='brand.100' />}
					alignItems='flex-start'
					spacing='4'
				>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Order date:{' '}
						</Text>
						<Spacer />
						<Text>{localDate(order.createdAt)}</Text>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Customer:{' '}
						</Text>
						<Spacer />
						{user && user.role === 'ADMIN' ? (
							<NextLink href={`/admin/user/${order.user._id}`}>
								<Link fontWeight='semibold'>{order.user.name}</Link>
							</NextLink>
						) : (
							<Text>{order.user.name}</Text>
						)}
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Email:{' '}
						</Text>
						<Spacer />
						<Text>{order.user.email}</Text>
					</HStack>
					<HStack spacing='16px' alignItems='flex-start'>
						<Text variant='label' mr='2'>
							Delivery Address:{' '}
						</Text>
						<Spacer />
						<VStack alignItems='flex-start'>
							<Text>{order.deliveryAddress.name}</Text>
							<Text>{order.deliveryAddress.street}</Text>
							<Text>{order.deliveryAddress.city}</Text>
							<Text>{order.deliveryAddress.postcode}</Text>
						</VStack>
					</HStack>
				</VStack>
				<Spacer />
				<VStack
					w='40%'
					divider={<StackDivider borderColor='brand.100' />}
					alignItems='flex-start'
					spacing='4'
				>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Product:{' '}
						</Text>
						<LinkBox>
							<NextLink href={`/product/${order.product._id}`} passHref>
								<LinkOverlay
									display='flex'
									alignItems='center'
									_hover={{ textDecoration: 'underline' }}
								>
									<Image
										src={order.product.image}
										alt={order.product.name}
										w='40px'
										h='40px'
										mr='4'
									/>
									<Text fontWeight='semibold'>{order.product.name}</Text>
								</LinkOverlay>
							</NextLink>
						</LinkBox>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Vendor:{' '}
						</Text>
						<Spacer />
						{user && user.role === 'ADMIN' ? (
							<NextLink href={`/admin/user/${order.product.user._id}`}>
								<Link fontWeight='semibold'>{order.product.user.name}</Link>
							</NextLink>
						) : (
							<Text>{order.product.user.name}</Text>
						)}
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Delivery Cost:{' '}
						</Text>
						<Text>{formatCurrency(order.deliveryCost)}</Text>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Platform Fee:{' '}
						</Text>
						<Text>{formatCurrency(order.platformFee)}</Text>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Total Cost:{' '}
						</Text>
						<Text fontWeight='bold'>{formatCurrency(order.totalCost)}</Text>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Payment Status:{' '}
						</Text>
						<Text>{order.paymentResult.status.toUpperCase()}</Text>
					</HStack>
					<HStack spacing='16px'>
						<Text variant='label' mr='2'>
							Payment Received:{' '}
						</Text>
						<Text>{localDate(order.paidAt)}</Text>
					</HStack>
				</VStack>
			</Flex>
		</>
	);
}
