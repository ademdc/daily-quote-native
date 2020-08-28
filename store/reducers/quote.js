import { GET_QUOTES, GET_RANDOM_QUOTE, GET_FAVORITE_QUOTES, SET_FAVORITE_QUOTE } from '../actions/quote';

const innitialState = {
	quote: null,
	favoriteQuotes: [],
	quotes: [],
	loading: false,
	error: null
}

const quoteReducer = (state = innitialState, action) => {
	switch(action.type) {
		case GET_QUOTES:
			return { ...state, quotes: action.quotes, quote: action.quote  }
		case GET_RANDOM_QUOTE:
			return { ...state, quote: action.quote }
		case GET_FAVORITE_QUOTES:
			return { ...state, favoriteQuotes: action.favoriteQuotes }
		case SET_FAVORITE_QUOTE:
			return { ...state, favoriteQuotes: [action.favoriteQuote, ...state.favoriteQuotes] }
		default:
			return state;
	}
  return state;
}

export default quoteReducer;