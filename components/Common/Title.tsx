import { Center, Heading } from '@chakra-ui/react';

export default function Title({ title }: { title: string }) {
	return (
		<Center py='8'>
			<Heading as='h1'>{title}</Heading>
		</Center>
	);
}
