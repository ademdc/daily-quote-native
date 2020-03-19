import * as actions from '../actions/auth';

const innitialState = {
	token: null,
	userId: null,
	pushToken: null
}

const authReducer = (state = innitialState, action) => {
	console.log(action.type)
	switch(action.type) {
		case actions.LOGIN:
			return { ...state, token: action.token, userId: action.userId }
		case actions.SIGN_UP:
				return { ...state, token: action.token, userId: action.userId }
		case actions.LOGOUT:
			return { innitialState }
		case actions.SET_PUSH_TOKEN:
			return { ...state, pushToken: action.pushToken }
		default:
			return state;
	}
  return state;
}

export default authReducer;