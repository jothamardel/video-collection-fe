


const INITIAL_STATE = {
	cookie: false,
	stopCookie:false,
	promoCenter: false,
	promoStatus:false,
	stopPromo:false,
}


const settingsReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
	
		default:
			return state;
	}
}


export default settingsReducer;