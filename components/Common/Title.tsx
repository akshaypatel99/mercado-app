import { Center, Heading } from '@chakra-ui/react';

export default function Title({ title, ...props }) {
	return (
		<Center py='8'>
			<Heading as='h1'>{title}</Heading>
		</Center>
	);
}
