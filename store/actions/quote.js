import URLs from '../../contants/urls';
import axios from 'axios';

export const GET_QUOTES = 'GET_QUOTES';
export const GET_RANDOM_QUOTE = 'GET_RANDOM_QUOTE';

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

export const getRandomQuote = (quotes) => {
	let randomIndex = Math.floor(Math.random() * quotes.length);
	const newQuote = quotes[randomIndex]
	return { type: GET_RANDOM_QUOTE, quote: newQuote}
}