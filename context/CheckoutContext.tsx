import { createContext, useState, ReactNode, useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from './AuthContext';

const CheckoutContext = createContext(null);

const CheckoutProvider = ({ children }: { children: ReactNode }) => {
	const [checkoutItem, setCheckoutItem] = useState(null);
	const { user } = useContext(AuthContext);

	const buyNow = (product) => {
		if (!user) {
			Router.push('/login');
		} else {
			setCheckoutItem(product);
			Router.push('/checkout');
		}
	};

	const cancelCheckout = () => {
		setCheckoutItem(null);
		Router.push('/products');
	};

	return (
		<CheckoutContext.Provider
			value={{
				checkoutItem,
				buyNow,
				cancelCheckout,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	);
};

export { CheckoutContext, CheckoutProvider };
