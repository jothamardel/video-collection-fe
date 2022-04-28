import axios from "axios";


let API_URL = process.env.REACT_APP_API;
console.log(API_URL)
export function httpLoginUser(data) {
	return axios.post(`${API_URL}login`, data);
}

export function httpRegisterUser(data) {
	return axios.post(`${API_URL}auth/register`, data);
}