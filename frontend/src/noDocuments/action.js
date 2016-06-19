import * as con from './constants.js'

export function resetHigherEducation() {
	return dispatch => {
		dispatch({
			type: con.HIGHER_EDUCATION_DATA
		});
	}
}

export function resetCourses() {
	return dispatch => {
		dispatch({
			type: con.COURSES_DATA
		});
	}
}