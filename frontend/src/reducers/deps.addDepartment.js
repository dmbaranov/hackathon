import * as con from '../constants/deps.AddDepartment'

const initialState = {
    registrationAllowed: false,
    parent_id: '',
    title: '',
    description: ''
};

export default function addDepartment(state = initialState, action) {
    switch(action.type) {

        case con.PARENT_ID_INPUT:
            return { ...state, parent_id: action.payload.value };

        case con.TITLE_INPUT:
            return { ...state, title: action.payload.value };

        case con.DESCRIPTION_INPUT:
            return { ...state, description: action.payload.value };

        case con.CHECK_REGISTRATION_ALLOWED:
            return { ...state, registrationAllowed: !state.registrationAllowed };
        
        case con.SUBMIT_ADD_FORM:
            return initialState;

        default:
            return state;

    }
}