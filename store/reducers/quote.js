import { GET_QUOTES, GET_RANDOM_QUOTE} from '../actions/quote';
import { ActionSheetIOS } from 'react-native';

const innitialState = {
	quote: null,
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
			default:
				return state;
    }
  return state;
}

export default quoteReducer;