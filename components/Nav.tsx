import {
	Flex,
	Button,
	Heading,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { WatchListContext } from '../context/WatchListContext';

export default function Nav() {
	const auth = useContext(AuthContext);
	const { watchListOnOpen } = useContext(WatchListContext);

	const userMenu = (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<FiChevronDown />}
				p='0'
				ml='6'
				bg='brand.teal'
				_hover={{ bg: 'brand.teal', color: 'brand.yellow' }}
				_expanded={{ bg: 'brand.teal' }}
				_focus={{ bg: 'brand.teal' }}
				_active={{ bg: 'brand.teal' }}
			>
				<Text fontSize='xl'>{auth?.user?.name}</Text>
			</MenuButton>
			<MenuList
				p='0.5'
				bg='brand.teal'
				_hover={{ bg: 'brand.teal' }}
				_expanded={{ bg: 'brand.teal' }}
			>
				<NextLink href='/account' passHref>
					<MenuItem
						bg='brand.teal'
						_hover={{ bg: 'brand.green' }}
						_focus={{ bg: 'brand.green' }}
						minH='48px'
						fontSize='lg'
						fontWeight='semibold'
						icon={<FiUser />}
					>
						Account
					</MenuItem>
				</NextLink>
				<MenuItem
					onClick={auth.logoutUser}
					bg='brand.teal'
					_hover={{ bg: 'brand.green' }}
					_focus={{ bg: 'brand.green' }}
					minH='48px'
					fontSize='lg'
					fontWeight='semibold'
					icon={<FiLogOut />}
				>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);

	return (
		<nav>
			<Flex width='100%' justify='space-around' alignItems='center'>
				<Link
					href='/products'
					ml='6'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontSize='xl' fontWeight='semibold'>
						Buy
					</Text>
				</Link>
				<Link
					href='/sell'
					ml='6'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontSize='xl' fontWeight='semibold'>
						Sell
					</Text>
				</Link>
				<Link
					href='/orders'
					ml='6'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontSize='xl' fontWeight='semibold'>
						Orders
					</Text>
				</Link>
				<Text
					ml='4'
					fontSize='xl'
					fontWeight='semibold'
					cursor='pointer'
					onClick={() => watchListOnOpen()}
					_hover={{ color: 'brand.yellow' }}
				>
					Watch List
				</Text>
				{auth.user ? (
					userMenu
				) : (
					<Link
						href='/login'
						ml='6'
						_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
					>
						<Text fontSize='xl' fontWeight='semibold'>
							Login
						</Text>
					</Link>
				)}
			</Flex>
		</nav>
	);
}
