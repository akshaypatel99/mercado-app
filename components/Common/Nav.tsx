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
import { AuthContext } from '../../context/AuthContext';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { WatchlistContext } from '../../context/WatchlistReactContext';

export default function Nav() {
	const { user, logoutUser } = useContext(AuthContext);
	const { watchlistOnOpen } = useContext(WatchlistContext);

	const userMenu = (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<FiChevronDown />}
				p='0'
				ml='4'
				bg='brand.700'
				_hover={{ bg: 'brand.700', color: 'brand.yellow' }}
				_expanded={{ bg: 'brand.700' }}
				_focus={{ bg: 'brand.700' }}
				_active={{ bg: 'brand.700' }}
				fontSize={['md', 'lg', 'xl', null]}
			>
				<Text>{user?.name.split(' ')[0]}</Text>
			</MenuButton>
			<MenuList
				p='0.5'
				bg='brand.500'
				_hover={{ bg: 'brand.500' }}
				_expanded={{ bg: 'brand.500' }}
				zIndex={2}
				fontSize={['sm', 'md', 'lg', null]}
			>
				{user && user.role === 'ADMIN' && (
					<NextLink href='/admin' passHref>
						<MenuItem
							bg='brand.500'
							_hover={{ bg: 'brand.400' }}
							_focus={{ bg: 'brand.450' }}
							minH={['36px', null, '48px', null]}
							fontWeight='semibold'
							icon={<FiUser />}
						>
							Admin
						</MenuItem>
					</NextLink>
				)}
				<MenuItem
					onClick={logoutUser}
					bg='brand.500'
					_hover={{ bg: 'brand.400' }}
					_focus={{ bg: 'brand.450' }}
					minH={['36px', null, '48px', null]}
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
			<Flex
				width='100%'
				justify='space-around'
				alignItems='center'
				fontSize={['md', 'lg', 'xl', null]}
			>
				<Link
					href='/products'
					ml='4'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontWeight='semibold'>Buy</Text>
				</Link>
				<Link
					href='/sell'
					ml='4'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontWeight='semibold'>Sell</Text>
				</Link>
				<Link
					href='/account'
					ml='4'
					_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
				>
					<Text fontWeight='semibold'>Account</Text>
				</Link>
				<Text
					ml='4'
					fontWeight='semibold'
					cursor='pointer'
					onClick={() => watchlistOnOpen()}
					_hover={{ color: 'brand.yellow' }}
				>
					Watchlist
				</Text>
				{user ? (
					userMenu
				) : (
					<Link
						href='/login'
						ml='4'
						_hover={{ textDecoration: 'none', color: 'brand.yellow' }}
					>
						<Text fontWeight='semibold'>Login</Text>
					</Link>
				)}
			</Flex>
		</nav>
	);
}
