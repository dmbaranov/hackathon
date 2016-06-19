import * as con from './constants.js'

const initialState = {
	specialization: ''
};

export default function sailor(state = initialState, action) {
	switch (action.type) {

		case con.BUTTON_CLICK:
			return { ...state, specialization: action.payload.specialization };

		default:
			return state
	}
}