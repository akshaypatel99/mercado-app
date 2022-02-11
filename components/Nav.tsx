import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';

export default function Nav() {
	return (
		<nav>
			<Flex justify='space-between' my='4'>
				<Link href='/products'>Products</Link>
				<Link href='/sell'>Sell</Link>
				<Link href='/orders'>Orders</Link>
				<Link href='/account'>Account</Link>
				<Link href='/signup'>Sign Up</Link>
				<Link href='/login'>Login</Link>
				<LogoutBtn />
			</Flex>
		</nav>
	);
}
