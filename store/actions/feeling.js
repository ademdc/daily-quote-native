import URLs from '../../contants/urls';
import axios from 'axios';

export const GET_LATEST_FEELINGS = 'GET_LATEST_FEELING';
export const GET_CURRENT_FEELING = 'GET_CURRENT_FEELING';
export const GET_ALL_FEELINGS = 'GET_ALL_FEELINGS';


export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const getCurrentFeeling = (feeling_id) => {
	return (dispatch, getState) => {
		axios.get(URLs.base.concat(`/feelings/latest_feeling`), 
			{ user_id: user_id }, {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(user => {
				return dispatch({ type: GET_PARTNER_FEELING, partnersFeeling: user.data });
			})
			.catch(error => {
				console.log(error)
		});
	}
}


export const getAllFeelings = () => {
	return (dispatch, getState) => {
		axios.get(URLs.base.concat(`/feelings`), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(user => {
				return dispatch({ type: GET_ALL_FEELINGS, allFeelings: user.data });
			})
			.catch(error => {
				console.log(error)
		});
	}
}

export const getLatestFeelings = (user_id) => {
	return (dispatch, getState) => {
		axios.get(URLs.base.concat(`/feelings/latest_feelings?user_id=${user_id}`), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(feeling => {
				return dispatch({ type: GET_LATEST_FEELINGS, latestFeeling: feeling.data.latest_feeling, partnerFeeling: feeling.data.partner_feeling });
			})
			.catch(error => {
				console.log(error)
		});
	}
}
