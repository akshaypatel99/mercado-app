import { useRouter } from 'next/router';
import Product from '../../components/Product';

export default function ProductPage() {
	const router = useRouter();
	const { id } = router.query;

	let prodId = '';
	if (id && typeof id === 'string') {
		prodId = id;
	}

	return <Product id={prodId} />;
}
