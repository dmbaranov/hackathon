import * as con from './constants.js'

const initialState = {
	higherEducation: false,
	coursesEducation: false
};

export default function noDocuments(state = initialState, action) {
	switch (action.type) {

		case con.HIGHER_EDUCATION_DATA:
			return { ...state, higherEducation: !state.higherEducation };

		case con.COURSES_DATA:
			return { ...state, coursesEducation: !state.coursesEducation };

		default: 
			return state;
	}
}