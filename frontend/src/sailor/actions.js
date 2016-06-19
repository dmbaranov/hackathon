import * as con from './constants.js'

export function buttonClick(specialization) {
	return dispatch => {
		dispatch({
			type: con.BUTTON_CLICK,
			payload: {
				specialization: specialization
			}
		});
	}
}