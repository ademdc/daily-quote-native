import URLs from '../../contants/urls';
import axios from 'axios';

export const GET_QUOTES = 'GET_QUOTES';
export const GET_RANDOM_QUOTE = 'GET_RANDOM_QUOTE';
export const GET_FAVORITE_QUOTES = 'GET_FAVORITE_QUOTES';


export const getQuotes = () => {
	return dispatch => {
		axios.get(URLs.testBase.concat('/quotes'))
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
		axios.get(URLs.testBase.concat('/quotes/favorites'), {
			headers: {
				Authorization: 'Bearer ' + getState().auth.token
			}})
			.then(quotes => {
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

export const getRandomQuote = (quotes) => {
	let randomIndex = Math.floor(Math.random() * quotes.length);
	const newQuote = quotes[randomIndex]
	return { type: GET_RANDOM_QUOTE, quote: newQuote}
}