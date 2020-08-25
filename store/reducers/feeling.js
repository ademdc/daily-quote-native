import * as actions from '../actions/feeling';

const innitialState = {
  partner: null,
	partnerFeeling: null,
  latestFeeling: null,
  currentFeeling: null,
  allFeelings: null
}

const feelingReducer = (state = innitialState, action) => {
	switch(action.type) {
    case actions.GET_ALL_FEELINGS:
			return { ...state, allFeelings: action.allFeelings }
		case actions.GET_LATEST_FEELINGS:
      console.log (action)
			return { ...state, latestFeeling: action.latestFeeling, partnerFeeling: action.partnerFeeling }
		case actions.GET_CURRENT_FEELING:
			return { ...state, currentFeeling: action.currentFeeling }
		default:
			return state;
	}
  return state;
}

export default feelingReducer;