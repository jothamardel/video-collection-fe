import ConstantTypes from './product.constants';



export const removeFromFav = id => ({
	type: ConstantTypes.REMOVE_FAVORITE,
	payload: id
});


export const addToShoppingCart = id => ({
	type: ConstantTypes.ADD_TO_CART,
	payload: id
})