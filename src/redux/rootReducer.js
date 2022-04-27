import { combineReducers } from 'redux';
import productsReducer from './Product/productReducer';
import userReducer from './User/userReducer';
import settingsReducer from './Settings/settingsReducer';

const rootReducer = combineReducers({
	products: productsReducer,
	user: userReducer,
	settings: settingsReducer
});


export default rootReducer;