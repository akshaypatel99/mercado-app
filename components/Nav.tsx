import {
	Flex,
	Button,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import LogoutBtn from './LogoutBtn';
import { FiChevronDown } from 'react-icons/fi';

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
				_focus={{ boxShadow: 'outline' }}
			>
				<Heading as='h3' fontSize='1.4rem'>
					{auth?.user?.name}
				</Heading>
			</MenuButton>
			<MenuList p='0.5' bg='brand.400' _hover={{ bg: 'brand.500' }}>
				<MenuItem
					p='1'
					pl='4'
					onClick={auth.logoutUser}
					bg='brand.400'
					_hover={{ bg: 'brand.500' }}
					minH='48px'
				>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);

	return (
		<nav>
			<Flex justify='space-between' my='4' alignItems='center'>
				<Link href='/products'>Products</Link>
				<Link href='/sell'>Sell</Link>
				<Link href='/orders'>Orders</Link>
				<Link href='/account'>Account</Link>
				{auth.user ? userMenu : <Link href='/login'>Login</Link>}
				{/* <LogoutBtn /> */}
			</Flex>
		</nav>
	);
}
