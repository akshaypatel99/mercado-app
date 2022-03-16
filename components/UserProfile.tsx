import {
	Flex,
	Heading,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatGroup,
	Text,
} from '@chakra-ui/react';
import formatCurrency from '../lib/formatCurrency';
import { localDate } from '../lib/localDate';

export default function UserProfile({ user }) {
	const itemsSold = user.userProducts.filter((item) => item.isSold);
	const totalEarnings = itemsSold.reduce((acc, item) => {
		return acc + item.price;
	}, 0);
	const totalSpent = user.userOrders.reduce((acc, item) => {
		return acc + item.totalCost;
	}, 0);
	const itemsBeingWatched = user.userProducts.filter(
		(item) => item.watchedBy.length > 0
	);

	return (
		<>
			<Flex my='8'>
				<Heading w='100%' fontSize='5xl'>
					{user.name}
				</Heading>
				<Flex w='100%' fontSize='lg' flexDir='column' justifyContent='center'>
					<Flex alignItems='center' mb='2'>
						<Text variant='label' mr='2'>
							Email:{' '}
						</Text>
						<Text>{user.email}</Text>
					</Flex>
					<Flex alignItems='center'>
						<Text variant='label' mr='2'>
							User since:{' '}
						</Text>
						<Text>{localDate(user.createdAt)}</Text>
					</Flex>
				</Flex>
			</Flex>
			<StatGroup>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Total Earnings
					</StatLabel>
					<StatNumber fontSize='4xl'>
						{formatCurrency(totalEarnings)}
					</StatNumber>
					<StatHelpText>Amount earnt from product sales</StatHelpText>
				</Stat>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Total Spent
					</StatLabel>
					<StatNumber fontSize='4xl'>{formatCurrency(totalSpent)}</StatNumber>
					<StatHelpText>Amount spent on purchases</StatHelpText>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Items Sold
					</StatLabel>
					<StatNumber fontSize='4xl'>{itemsSold.length}</StatNumber>
					<StatHelpText>No. products sold on Mercado</StatHelpText>
				</Stat>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Items purchased
					</StatLabel>
					<StatNumber fontSize='4xl'>{user.userOrders.length}</StatNumber>
					<StatHelpText>No. products purchased on Mercado</StatHelpText>
				</Stat>
			</StatGroup>
			<StatGroup>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Items Being Watched
					</StatLabel>
					<StatNumber fontSize='4xl'>{itemsBeingWatched.length}</StatNumber>
					<StatHelpText>No. products on all Watch Lists</StatHelpText>
				</Stat>
				<Stat p='6' minW='200px'>
					<StatLabel fontWeight='bold' textTransform='uppercase'>
						Items On My Watch List
					</StatLabel>
					<StatNumber fontSize='4xl'>{user.userWatchList.length}</StatNumber>
					<StatHelpText>No. products on my Watch List</StatHelpText>
				</Stat>
			</StatGroup>
		</>
	);
}
