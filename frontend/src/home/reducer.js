import * as con from './constants.js'

const initialState = {
	profession: ''
};

export default function home(state = initialState, action) {
	switch (action.type) {
		case con.PROFESSION_BUTTON_CLICK:
			return { ...state, profession: action.payload.profession };

		default: {
			return state;
		}
	}
}