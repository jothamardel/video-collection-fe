import ConstantTypes from './product.constants';
import { ProductData } from '../../jsx/app/data/productsData';

const INITIAL_STATE = {
	products: ProductData,
	carts: ProductData.slice(4,7),
	favorites: ProductData.slice(8,12),
	compare: ProductData.slice(0,2),
	single: null,
}

const productsReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {

		case ConstantTypes.ADD_TO_CART:
			return {
				...state,
				carts: []
			}
		
		case ConstantTypes.REMOVE_FAVORITE:
			return {
				...state,
				favorites: []
			}
	
		default:
			return state;
	}
}

export default productsReducer;

