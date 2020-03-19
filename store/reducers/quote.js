import { GET_QUOTES, GET_RANDOM_QUOTE, GET_FAVORITE_QUOTES} from '../actions/quote';
import { ActionSheetIOS } from 'react-native';

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
			default:
				return state;
    }
  return state;
}

export default quoteReducer;