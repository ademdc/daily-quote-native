import * as actions from '../actions/auth';

const innitialState = {
	token: null,
	userId: null,
	pushToken: null,
	partner: null
}

const authReducer = (state = innitialState, action) => {
	switch(action.type) {
		case actions.AUTHENTICATE:
			return { ...state, token: action.token, userId: action.userId }
		case actions.LOGOUT:
			return { innitialState }
		case actions.SET_PUSH_TOKEN:
			return { ...state, pushToken: action.pushToken }
		case actions.SET_PARTNER:
				return { ...state, partner: action.partner }
		default:
			return state;
	}
  return state;
}

export default authReducer;