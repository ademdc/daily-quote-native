import URLs from '../../contants/urls';
import axios from 'axios';

export const GET_LATEST_FEELINGS     = 'GET_LATEST_FEELING';
export const GET_CURRENT_FEELING     = 'GET_CURRENT_FEELING';
export const GET_ALL_FEELINGS        = 'GET_ALL_FEELINGS';
export const SET_NEW_LATEST_FEELING  = 'SET_NEW_LATEST_FEELING';
export const GET_USER_FEELINGS       = 'GET_USER_FEELINGS';
export const RESET_USER_FEELINGS     = 'RESET_USER_FEELINGS';
export const SET_LOADING             = 'SET_LOADING';

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
		axios.get(URLs.base.concat('/feelings'), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(user => {
        dispatch({ type: GET_ALL_FEELINGS, allFeelings: user.data });
        return user;
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

export const setNewLatestFeeling = (feeling_id) => {
	return (dispatch, getState) => {
    dispatch(setLoading(true));
		axios.post(URLs.base.concat(`/feelings/create_user_feeling?feeling_id=${feeling_id}`), {}, {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(feeling => {
        dispatch({ type: SET_NEW_LATEST_FEELING, latestFeeling: feeling.data });
        getLatestFeelings(getState().auth.userId)
			})
			.catch(error => {
				console.log(error)
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
	}
}

export const getUserFeelings = (feeling_id, user_id) => {
	return (dispatch, getState) => {
		axios.get(URLs.base.concat(`/feelings/user_feeling?user_id=${user_id}&feeling_id=${feeling_id}`), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(feeling => {
        return dispatch({ type: GET_USER_FEELINGS, userFeeling: feeling.data });
			})
			.catch(error => {
				console.log(error)
		});
	}
}

export const resetFeelings = () => {
	return dispatch => {
    dispatch({ type: RESET_USER_FEELINGS });
	}
}

export const setLoading = (loading) => {
  return { type: SET_LOADING, loading: loading };
}