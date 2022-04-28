import ConstantTypes from './user.constants';

const INITIAL_STATE = {
	  status: false,
		user:{}
}


const userReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {

		case ConstantTypes.REGISTER_USER_START:
			return {
				...state,
				loading: true
			}
		case ConstantTypes.LOGIN_USER_START:
			return {
				...state,
				loading: true
			}
		
		case ConstantTypes.REGISTER_USER_SUCCESS: 
			return {
				...state,
				loading: false
			}

		case ConstantTypes.REGISTER_USER_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload
			}
			
		case ConstantTypes.LOGIN_USER_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case ConstantTypes.LOGIN_USER_SUCCESS: 
			return {
				...state,
				loading: false,
				user: action.payload
			}

		case ConstantTypes.LOGOUT_USER: 
			return {
				...state,
				user: {}
			}

		case ConstantTypes.LOAD_USER: 
			return {
				...state,
				user: {
					...action.payload
				}
			}
	
	
		default:
			return state;
	}
}


export default userReducer;