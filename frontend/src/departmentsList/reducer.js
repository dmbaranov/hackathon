import * as con from './constants'

const initialState = {
    token: '',
    data: [],
    isButtonFetchDisabled: false,
    active: {
        id: '',
        title: '',
        description: '',
        user_registration_allowed: false
    },
    Alert: {
        isVisible: false,
        type: '',
        message: ''
    }
};

export default function departmentsList(state = initialState, action) {
    switch (action.type) {

        case con.FETCH_LIST:
            return { ...state, token: action.payload.token, data: action.payload.data };

        case con.RENDER_LIST:
            return { ...state, data: action.payload.data };

        case con.UPDATE_DEPARTMENT: {
            return { ...state, active: {} };
        }

        case con.SET_NODE_ACTIVE:
            return { ...state, active: action.payload.node };

        /*case con.EDIT_DEPARTMENT_ID:
            let tempID = state.active;
            tempID.id = action.payload.value;
            return { ...state, active: tempID };
            return { ...state, active: { ...state.active, id: action.payload.value } };*/

        case con.EDIT_DEPARTMENT_DESCRIPTION:
            return { ...state, active: { ...state.active, description: action.payload.value } };

        case con.EDIT_DEPARTMENT_TITLE:
            return { ...state, active: { ...state.active, title: action.payload.value } };

        case con.EDIT_DEPARTMENT_REGISTRATION:
            return { ...state, active: { ...state.active, user_registration_allowed: !state.active.user_registration_allowed } };

        case con.RESET_BUTTON_FETCH_STATE:
            return { ...state, isButtonFetchDisabled: !state.isButtonFetchDisabled };

        case con.RESET_ALERT_VISIBILITY:
            return { ...state, Alert: { ...state.Alert, isVisible: !state.Alert.isVisible } };

        case con.SET_ALERT_MESSAGE: 
            return { ...state, Alert: { ...state.Alert, message: action.payload.message, type: action.payload.type } };

        default:
            return state;
    }
}