import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import quoteReducer from './reducers/quote';
import authReducer from './reducers/auth';
import feelingReducer from './reducers/feeling';

const rootReducer = combineReducers({
    quote: quoteReducer,
    auth: authReducer,
    feeling: feelingReducer
  })
  
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
