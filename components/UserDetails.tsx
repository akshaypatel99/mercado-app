import { Box, Heading, Text } from '@chakra-ui/react';
import { localDate } from '../lib/localDate';

export default function UserDetails({ user }) {
	return (
		<>
			<Heading fontSize='4xl'>{user.name}</Heading>
			<Box>
				<Text fontSize='xl'>Email: {user.email}</Text>
				<Text fontSize='xl'>User since: {localDate(user.createdAt)}</Text>
			</Box>
		</>
	);
}
