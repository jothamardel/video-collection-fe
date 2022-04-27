import { Route } from 'react-router-dom';
import loadable from './component/Common/loader/loadable';
import pMinDelay from 'p-min-delay';

import Loading from './component/Common/loader';

import Routes from '../utils/Routes';

const Furniture = loadable(() => pMinDelay(import ('./page/furniture'), 250), { fallback: <Loading />});
const Electronics = loadable(() => pMinDelay(import ('./page/electronics'), 250), { fallback: <Loading />});
const ShopGrid = loadable(() => pMinDelay(import ('./page/shop'), 250), { fallback: <Loading />});
const ShopTwo = loadable(() => pMinDelay(import ('./page/shop/shop-two'), 250), { fallback: <Loading />});
const ShopList = loadable(() => pMinDelay(import ('./page/shop/shop-list'), 250), { fallback: <Loading />});
const ShopLeftSideBar = loadable(() => pMinDelay(import ('./page/shop/shop-left-sidebar'), 250), { fallback: <Loading />});
const ShopRightSideBar = loadable(() => pMinDelay(import ('./page/shop/shop-right-sidebar'), 250), { fallback: <Loading />});
const ProductDetails = loadable(() => pMinDelay(import ('./page/product/index'), 250), { fallback: <Loading />});
const ProductDetailsTwos = loadable(() => pMinDelay(import ('./page/product/product-details-two'), 250), { fallback: <Loading />});
const Cart = loadable(() => pMinDelay(import ('./page/cart/index'), 250), { fallback: <Loading />});
const CartTwo = loadable(() => pMinDelay(import ('./page/cart/cart-two'), 250), { fallback: <Loading />});
const EmptyCarts = loadable(() => pMinDelay(import ('./page/cart/empty-cart'), 250), { fallback: <Loading />});
const CheckoutOne = loadable(() => pMinDelay(import ('./page/checkout/index'), 250), { fallback: <Loading />});
const CheckoutTwos = loadable(() => pMinDelay(import ('./page/checkout/checkout-two'), 250), { fallback: <Loading />});
const WishLists = loadable(() => pMinDelay(import ('./page/shop/wishList'), 250), { fallback: <Loading />});
const Compares = loadable(() => pMinDelay(import ('./page/shop/compares'), 250), { fallback: <Loading />});
const About = loadable(() => pMinDelay(import ('./page/about'), 250), { fallback: <Loading />});
const OrderComplete = loadable(() => pMinDelay(import ('./page/order/order-complete'), 250), { fallback: <Loading />});
const OrderTracking = loadable(() => pMinDelay(import ('./page/order/order-tracking'), 250), { fallback: <Loading />});
const ProductHover = loadable(() => pMinDelay(import ('./page/product/product-hover'), 250), { fallback: <Loading />});
const OrderSuccesses = loadable(() => pMinDelay(import ('./page/order/order-success'), 250), { fallback: <Loading />});
const EmailTemplateOnes = loadable(() => pMinDelay(import ('./page/email/index'), 250), { fallback: <Loading />});
const EmailTemplateTwos = loadable(() => pMinDelay(import ('./page/email/email-template-two'), 250), { fallback: <Loading />});
const EmailTemplateThrees = loadable(() => pMinDelay(import ('./page/email/email-template-three'), 250), { fallback: <Loading />});
const InvoiceOne = loadable(() => pMinDelay(import ('./page/invoice/index'), 250), { fallback: <Loading />});
const InvoiceTwo = loadable(() => pMinDelay(import ('./page/invoice/invoice-two'), 250), { fallback: <Loading />});
const LookBooks = loadable(() => pMinDelay(import ('./page/shop/look-book'), 250), { fallback: <Loading />});
const BlogGridThrees = loadable(() => pMinDelay(import ('./page/blog/blog-grid-two'), 250), { fallback: <Loading />});
const BlogGridTwos = loadable(() => pMinDelay(import ('./page/blog/'), 250), { fallback: <Loading />});
const BlogListView = loadable(() => pMinDelay(import ('./page/blog/blog-list'), 250), { fallback: <Loading />});
const BlogSingleOnes = loadable(() => pMinDelay(import ('./page/blog/blog-single-one'), 250), { fallback: <Loading />});
const BlogSingleTwos = loadable(() => pMinDelay(import ('./page/blog/blog-single-two'), 250), { fallback: <Loading />});
const Login = loadable(() => pMinDelay(import ('./page/login'), 250), { fallback: <Loading />});
const Register = loadable(() => pMinDelay(import ('./page/register'), 250), { fallback: <Loading />});
const PrivacyPolicy = loadable(() => pMinDelay(import ('./page/privacy-policy'), 250), { fallback: <Loading />});
const Faqs = loadable(() => pMinDelay(import ('./page/faqs'), 250), { fallback: <Loading />});
const ComingSoon = loadable(() => pMinDelay(import ('./page/coming-soon'), 250), { fallback: <Loading />});
const ContactOne = loadable(() => pMinDelay(import ('./page/contact'), 250), { fallback: <Loading />});
const ContactTwo = loadable(() => pMinDelay(import ('./page/contact/contact-two'), 250), { fallback: <Loading />});
const Fashion = loadable(() => pMinDelay(import ('./page/'), 250), { fallback: <Loading />});
const VerifyAccount = loadable(() => pMinDelay(import ('./page/Verify'), 250), { fallback: <Loading />});





function Markup(props) {
	const components = [
		{ path: Routes.home, el: Fashion },
		{ path: Routes.furniture, el: Furniture },
		{ path: Routes.electronics, el: Electronics },
		{ path: Routes.shop, el: ShopGrid },
		{ path: Routes.shopTwo, el: ShopTwo },
		{ path: Routes.shoplist, el: ShopList },
		{ path: Routes.shopLeftBar, el: ShopLeftSideBar },
		{ path: Routes.shopRightBar, el: ShopRightSideBar },
		{ path: Routes.cart, el: Cart },
		{ path: Routes.cartTwo, el: CartTwo },
		{ path: Routes.emptyCart, el: EmptyCarts },
		{ path: Routes.checkoutOne, el: CheckoutOne },
		{ path: Routes.checkoutTwo, el: CheckoutTwos },
		{ path: Routes.wishlist, el: WishLists },
		{ path: Routes.compare, el: Compares },
		{ path: Routes.orderComplete, el: OrderComplete },
		{ path: Routes.orderTracking, el: OrderTracking },
		{ path: Routes.about, el: About },
		{ path: Routes.productHover, el: ProductHover },
		{ path: Routes.orderSuccess, el: OrderSuccesses },
		{ path: Routes.emailTemplateOne, el: EmailTemplateOnes },
		{ path: Routes.emailTemplateTwo, el: EmailTemplateTwos },
		{ path: Routes.emailTemplateThree, el: EmailTemplateThrees },
		{ path: Routes.invoiceOne, el: InvoiceOne },
		{ path: Routes.invoiceTwo, el: InvoiceTwo },
		{ path: Routes.lookbooks, el: LookBooks },
		{ path: Routes.blogGridThree, el: BlogGridThrees },
		{ path: Routes.blogGridTwo, el: BlogGridTwos },
		{ path: Routes.blogListView, el: BlogListView },
		{ path: Routes.blogSingleOne, el: BlogSingleOnes },
		{ path: Routes.blogSingleTwo, el: BlogSingleTwos },
		{ path: Routes.login, el: Login },
		{ path: Routes.register, el: Register },
		{ path: Routes.privacyPolicy, el: PrivacyPolicy },
		{ path: Routes.faqs, el: Faqs },
		{ path: Routes.comingSoon, el: ComingSoon },
		{ path: Routes.contactOne, el: ContactOne },
		{ path: Routes.contactTwo, el: ContactTwo },
		{ path: Routes.productDetailsOne, el: ProductDetails },
		{ path: Routes.productDetailsTwo, el: ProductDetailsTwos },
		{ path: Routes.verify, el: VerifyAccount },
	]


	return (
		<>
			{
				components.map((item, i) => (
					<Route 
						key={i.toString()} 
						path={item.path} 
						exact 
						component={item.el} 
					/>
				))
			}
		</>
	)
}


export default Markup;