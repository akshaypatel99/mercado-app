import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';

export default function Nav() {
	return (
		<nav>
			<Flex justify='space-between' my='4'>
				<Link href='/products'>
					<a>Products</a>
				</Link>
				<Link href='/sell'>
					<a>Sell</a>
				</Link>
				<Link href='/orders'>
					<a>Orders</a>
				</Link>
				<Link href='/account'>
					<a>Account</a>
				</Link>
				<Link href='/signup'>
					<a>Sign Up</a>
				</Link>
				<Link href='/login'>
					<a>Login</a>
				</Link>
				<LogoutBtn />
			</Flex>
		</nav>
	);
}
