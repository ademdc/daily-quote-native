import URLs from '../../contants/urls';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
	return async dispatch => {
		response = await axios.post(URLs.testBase.concat('/login'), { users: { email: email, password: password }});

		if(response.status != 200) {
			console.log("IN FAIL LOGIN")
			throw new Error('Something went wrong')
		}
		console.log("IN SUCCESS LOGIN")

		return dispatch({
			type: LOGIN,
			token: response.data.jwt,
			userId: response.data.userId
		});
	}
}

export const signUp = (email, password) => {
	return async dispatch => {
		response = await axios.post(URLs.testBase.concat('/signup'), { users: { email: email, password: password }});
		if(response.status != 200) {
			console.log("IN FAIL SIGNUP")
			throw new Error('Something went wrong')
		}
		console.log("IN SUCCESS SIGUNP")

		return dispatch({
			type: SIGN_UP,
			token: response.data.jwt,
			userId: response.data.userId
		});
	}
}
export const logout = () => {
	AsyncStorage.removeItem('userData');
	return { type: LOGOUT };
}

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};

