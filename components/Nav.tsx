import {
	Flex,
	Button,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
	FiChevronDown,
	FiLogOut,
	FiShoppingCart,
	FiUser,
} from 'react-icons/fi';

export default function Nav() {
	const auth = useContext(AuthContext);

	const userMenu = (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<FiChevronDown />}
				p='0'
				bg='brand.500'
				_hover={{ bg: 'brand.500' }}
				_expanded={{ bg: 'brand.500' }}
				_focus={{ bg: 'brand.500' }}
				_active={{ bg: 'brand.500' }}
			>
				<Heading as='h3' fontSize='1.4rem'>
					{auth?.user?.name}
				</Heading>
			</MenuButton>
			<MenuList
				p='0.5'
				bg='brand.400'
				_hover={{ bg: 'brand.500' }}
				_expanded={{ bg: 'brand.500' }}
			>
				<MenuItem
					bg='brand.400'
					_hover={{ bg: 'brand.600' }}
					_focus={{ bg: 'brand.400' }}
					minH='48px'
					fontSize='lg'
					fontWeight='bold'
					icon={<FiUser />}
				>
					<Link href='/account'>Account</Link>
				</MenuItem>
				<MenuItem
					onClick={auth.logoutUser}
					bg='brand.400'
					_hover={{ bg: 'brand.600' }}
					_focus={{ bg: 'brand.400' }}
					minH='48px'
					fontSize='lg'
					fontWeight='bold'
					icon={<FiLogOut />}
				>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);

	return (
		<nav>
			<Flex justify='space-between' my='4' alignItems='center'>
				<Link href='/products'>Buy</Link>
				<Link href='/sell'>Sell</Link>
				<Link href='/orders'>Orders</Link>
				{auth.user ? userMenu : <Link href='/login'>Login</Link>}
				<Link href='/account' passHref>
					<a>
						<FiShoppingCart />
					</a>
				</Link>
			</Flex>
		</nav>
	);
}
