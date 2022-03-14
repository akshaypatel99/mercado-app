import {
	Flex,
	Button,
	Link,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import NextLink from 'next/link';
import { AuthContext } from '../context/AuthContext';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { WatchListContext } from '../context/WatchListContext';

export default function Nav() {
	const { user, logoutUser } = useContext(AuthContext);
	const { watchListOnOpen } = useContext(WatchListContext);

	const userMenu = (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<FiChevronDown />}
				p='0'
				ml='6'
				bg='brand.blue'
				_hover={{ bg: 'brand.blue', color: 'brand.yellow' }}
				_expanded={{ bg: 'brand.blue' }}
				_focus={{ bg: 'brand.blue' }}
				_active={{ bg: 'brand.blue' }}
			>
				<Text fontSize='xl'>{user?.name}</Text>
			</MenuButton>
			<MenuList
				p='0.5'
				bg='brand.400'
				_hover={{ bg: 'brand.400' }}
				_expanded={{ bg: 'brand.400' }}
			>
				{user && user.role === 'ADMIN' && (
					<NextLink href='/admin' passHref>
						<MenuItem
							bg='brand.400'
							_hover={{ bg: 'brand.300' }}
							_focus={{ bg: 'brand.350' }}
							minH='48px'
							fontSize='lg'
							fontWeight='semibold'
							icon={<FiUser />}
						>
							Admin
						</MenuItem>
					</NextLink>
				)}
				<MenuItem
					onClick={logoutUser}
					bg='brand.400'
					_hover={{ bg: 'brand.300' }}
					_focus={{ bg: 'brand.350' }}
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
					href='/account'
					ml='6'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontSize='xl' fontWeight='semibold'>
						Account
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
				{user ? (
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
