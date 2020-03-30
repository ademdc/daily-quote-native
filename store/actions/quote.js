import URLs from '../../contants/urls';
import axios from 'axios';

export const GET_QUOTES = 'GET_QUOTES';
export const GET_RANDOM_QUOTE = 'GET_RANDOM_QUOTE';
export const GET_FAVORITE_QUOTES = 'GET_FAVORITE_QUOTES';
export const SET_FAVORITE_QUOTE = 'SET_FAVORITE_QUOTE';


export const getQuotes = () => {
	return dispatch => {
		axios.get(URLs.base.concat('/quotes'))
			.then(quotes => {
				return dispatch({
					type: GET_QUOTES,
					quotes: quotes.data,
					quote: quotes.data[0]
				});
			})
			.catch(error => {
				console.log(error)
				return false;
		});
	}
}

export const getFavoriteQuotes = () => {
	return (dispatch, getState) => {
		axios.get(URLs.base.concat('/quotes/favorites'), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(quotes => {
				console.log(quotes.data)
				return dispatch({
					type: GET_FAVORITE_QUOTES,
					favoriteQuotes: quotes.data
				});
			})
			.catch(error => {
				console.log(error)
				return false;
		});
	}
}

export const getRandomQuote = () => {
	return dispatch => {
		axios.get(URLs.base.concat('/quotes/daily'))
			.then(quote => {
				return dispatch({
					type: GET_RANDOM_QUOTE,
					quote: quote.data
				});
			})
			.catch(error => {
				console.log(error)
				return false;
		});
	}
}

export const setFavoriteQuote = (quote) => {
	return (dispatch, getState) => {
		axios.post(URLs.base.concat('/quotes/set_favorite'), {
			user_id:  getState().auth.userId,
			quote_id: quote.id
		}, {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(quotes => {
				return dispatch({
					type: SET_FAVORITE_QUOTE,
					favoriteQuote: quotes.data.favorite_quote
				});
			})
			.catch(error => {
				console.log(error)
				return false;
		});
	}
}