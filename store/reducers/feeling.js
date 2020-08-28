import * as actions from '../actions/feeling';

const innitialState = {
  partner: null,
	partnerFeeling: null,
  latestFeeling: null,
  currentFeeling: null,
  allFeelings: null,
  userFeeling: null
}

const feelingReducer = (state = innitialState, action) => {
	switch(action.type) {
    case actions.GET_ALL_FEELINGS:
			return { ...state, allFeelings: action.allFeelings }
		case actions.GET_LATEST_FEELINGS:
			return { ...state, latestFeeling: action.latestFeeling, partnerFeeling: action.partnerFeeling }
		case actions.GET_CURRENT_FEELING:
      return { ...state, currentFeeling: action.currentFeeling }
    case actions.SET_NEW_LATEST_FEELING:
      return { ...state, latestFeeling: action.latestFeeling }
    case actions.GET_USER_FEELINGS:
      return { ...state, userFeeling: action.userFeeling }
		default:
			return state;
	}
  return state;
}

export default feelingReducer;