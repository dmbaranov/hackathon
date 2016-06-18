import * as con from './constants'

const initialState = {
    email: '',
    password: '',
    phone: '',
    login: '',
    password_confirmation: '',
    department_id: '',
    departmentsList: '',
    isButtonDisabled: false,
    Alert: {
        isVisible: false,
        type: '',
        message: ''
    }
};

export default function addUser(state = initialState, action) {
    switch (action.type) {

        case con.EMAIL_INPUT:
            return { ...state, email: action.payload.value };

        case con.PHONE_INPUT:
            return { ...state, phone: action.payload.value };

        case con.LOGIN_INPUT:
            return { ...state, login: action.payload.value };

        case con.PASSWORD_INPUT:
            return { ...state, password: action.payload.value };

        case con.PASSWORD_CONFIRM_INPUT:
            return { ...state, password_confirmation: action.payload.value };

        case con.DEPARTMENT_SELECT:
            return { ...state, department_id: action.payload.value };

        case con.UPDATE_DEPARTMENTS_LIST:
            return { ...state, departmentsList: action.payload.data };

        case con.RESET_BUTTON_STATE:
            return { ...state, isButtonDisabled: !state.isButtonDisabled };

        case con.RESET_ALERT_VISIBILITY:
            return { ...state, Alert: { ...state.Alert, isVisible: !state.Alert.isVisible } };

        case con.SET_ALERT_MESSAGE: 
            return { ...state, Alert: { ...state.Alert, message: action.payload.message, type: action.payload.type } };

        case con.CLEAR_FORM_STATE:
            return { ...state, email: '', phone: '', login: '', password: '', password_confirmation: '', department_id: '' };

        default:
            return state;
    }
}
