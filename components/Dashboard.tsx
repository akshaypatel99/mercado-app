import { SimpleGrid } from '@chakra-ui/react';
import AccountOption from './DashboardOption';

type Option = {
	heading: string;
	imageUrl?: string;
	href: string;
};

export default function Dashboard({ options }: { options: Option[] }) {
	return (
		<SimpleGrid columns={2} spacing={10}>
			{options.map((option) => (
				<AccountOption key={option.href} {...option} />
			))}
		</SimpleGrid>
	);
}
