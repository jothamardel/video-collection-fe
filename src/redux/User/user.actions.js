import ConstantTypes from './user.constants';
import { httpLoginUser, httpRegisterUser } from '../../services/user.service';
import { transformUserData } from './user.helper';
import Swal from "sweetalert2";
import Routes from '../../utils/Routes';

export const registerUser = (data, history) => async dispatch => {
	dispatch({ type: ConstantTypes.REGISTER_USER_START });

	try {
		const response = await httpRegisterUser(data);
		if (response.status === 201) {
			dispatch({
				type: ConstantTypes.REGISTER_USER_SUCCESS,
				payload: response.data
			});
			Swal.fire({
				title: 'Success!',
				text: response.data.message,
				icon: 'success',
				showConfirmButton: true,
			})
			history.push(Routes.verify);
		}
		return;
	} catch (error) {
		console.log("Error==========>", error);
			Swal.fire({
				title: 'Error!',
				text: error.response.data.message,
				icon: 'error',
				showConfirmButton: true,
			})
			dispatch({
				type: ConstantTypes.REGISTER_USER_FAILED,
				payload: error.response
			});
	}
}

export const loginUser = (data, history) => async dispatch => {
	dispatch({ type: ConstantTypes.LOGIN_USER_START });

	try {
		const response = await httpLoginUser(data);
		console.log(response)
		if (response.status === 200) {
			dispatch({
				type: ConstantTypes.LOGIN_USER_SUCCESS,
				payload: response.data.data
			});
			history.push(Routes.home);
		}
		return;
	} catch (error) {
		console.log("Error==========>", error);
			Swal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				showConfirmButton: true,
			})
			dispatch({
				type: ConstantTypes.LOGIN_USER_FAILED,
				payload: error.response
			});
	}
}


export const logoutUser = () => ({
	type: ConstantTypes.LOGOUT_USER
})

export const loadAdmin = (data) => ({
	type: ConstantTypes.LOAD_USER,
	payload: data
})

export const selectVideo = video => ({
	type: ConstantTypes.SELECT_VIDEO,
	payload: video
})