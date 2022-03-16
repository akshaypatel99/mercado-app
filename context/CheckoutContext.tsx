import { createContext, useState, ReactNode, useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from './AuthContext';

const CheckoutContext = createContext(null);

const CheckoutProvider = ({ children }: { children: ReactNode }) => {
	const [checkoutItem, setCheckoutItem] = useState(null);
	const { user } = useContext(AuthContext);

	const buyNow = (product) => {
		if (!user) {
			Router.push('/login?message=Please login or signup to buy this product');
		} else {
			setCheckoutItem(product);
			Router.push('/checkout');
		}
	};

	const cancelCheckout = (id: string) => {
		setCheckoutItem(null);
		Router.push('/product/[id]', `/product/${id}`);
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
