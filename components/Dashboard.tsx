import { SimpleGrid } from '@chakra-ui/react';
import DashboardOption from './DashboardOption';

type Option = {
	heading: string;
	imageUrl?: string;
	href: string;
};

export default function Dashboard({ options }: { options: Option[] }) {
	return (
		<SimpleGrid minChildWidth='172px' spacingX={40} spacingY={20} mt='10'>
			{options.map((option) => (
				<DashboardOption key={option.href} {...option} />
			))}
		</SimpleGrid>
	);
}
