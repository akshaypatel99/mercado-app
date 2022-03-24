import { createContext, useState, ReactNode, useContext } from 'react';
import Router from 'next/router';
import { AuthContext } from './AuthContext';
import { ProductType } from '../pages/product/[id]';

type CheckoutContextType = {
	checkoutItem: ProductType | null;
	buyNow: (product: ProductType) => void;
	cancelCheckout: (id: string) => void;
};

const CheckoutContext = createContext<CheckoutContextType>(
	{} as CheckoutContextType
);

const CheckoutProvider = ({ children }: { children: ReactNode }) => {
	const [checkoutItem, setCheckoutItem] = useState<ProductType | null>(null);
	const { user } = useContext(AuthContext);

	const buyNow = (product: ProductType) => {
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
