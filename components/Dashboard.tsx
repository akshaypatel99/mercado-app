import { SimpleGrid } from '@chakra-ui/react';
import DashboardOption from './DashboardOption';

type Option = {
	heading: string;
	imageUrl?: string;
	href: string;
};

export default function Dashboard({ options }: { options: Option[] }) {
	return (
		<SimpleGrid
			minChildWidth='400px'
			spacing='60px'
			mt='8'
			justifyItems='center'
		>
			{options.map((option) => (
				<DashboardOption key={option.href} {...option} />
			))}
		</SimpleGrid>
	);
}
