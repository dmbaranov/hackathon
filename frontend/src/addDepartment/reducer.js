import * as con from './constants'

const initialState = {
    user_registration_allowed: false,
    parent_id: '',
    title: '',
    description: '',
    departmentsList: '',
    Alert: {
        isVisible: false,
        type: '',
        message: ''
    }
};

export default function addDepartment(state = initialState, action) {
    switch (action.type) {
        
        case con.PARENT_ID_SELECT: 
            return { ...state, parent_id: action.payload.value };

        case con.TITLE_INPUT:
            return { ...state, title: action.payload.value };

        case con.DESCRIPTION_INPUT:
            return { ...state, description: action.payload.value };

        case con.CHECK_REGISTRATION_ALLOWED:
            return { ...state, user_registration_allowed: !state.user_registration_allowed };

        case con.UPDATE_DEPARTMENTS_LIST:
            return { ...state, departmentsList: action.payload.data };

        case con.CLEAR_FORM_STATE:
            return { ...state, user_registration_allowed: false, parent_id: '', title: '', description: '' };

        case con.RESET_ALERT_VISIBILITY:
            return { ...state, Alert: { ...state.Alert, isVisible: !state.Alert.isVisible } };

        case con.SET_ALERT_MESSAGE: 
            return { ...state, Alert: { ...state.Alert, message: action.payload.message, type: action.payload.type } };

        default:
            return state;

    }
}