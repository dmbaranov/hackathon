import * as con from './constants'

const initialState = {
    login: '',
    password: '',
    isButtonLoginDisabled: false,
    isButtonLogoutDisabled: false,
    validationState: '',
    User: {
        isAuthenticated: window.localStorage.getItem('token') === null ? false : true,
        token: window.localStorage.getItem('token')
    },
    Alert: {
        isVisible: false,
        type: '',
        message: ''
    }
};

export default function login(state = initialState, action) {

    switch (action.type) {

        case con.LOGIN_SUCCESS:
            return { ...state, User: { ...state.User, isAuthenticated: true, token: action.payload.data.session.authentication_token } };
            //return { ...state, isAuthenticated: true, token: action.payload.data.session.authentication_token };

        case con.LOGOUT_SUCCESS:
            return { ...state, login: '', password: '', User: { ...state.User, isAuthenticated: false, token: null } };
            //return { ...state, isAuthenticated: false, token: null };

        case con.LOGIN_FAILED: 
            return { ...state, validationState: 'error', login: '', password: '' };

        case con.LOGIN_INPUT:
            return { ...state, login: action.payload.value, validationState: '' };

        case con.PASSWORD_INPUT:
            return { ...state, password: action.payload.value, validationState: '' };

        case con.RESET_BUTTON_LOGIN_STATE:
            return { ...state, isButtonLoginDisabled: !state.isButtonLoginDisabled };

        case con.RESET_BUTTON_LOGOUT_STATE:
            return { ...state, isButtonLogoutDisabled: !state.isButtonLogoutDisabled };

        case con.RESET_ALERT_VISIBILITY:
            return { ...state, Alert: { ...state.Alert, isVisible: !state.Alert.isVisible } };

        case con.SET_ALERT_MESSAGE: {
            return { ...state, Alert: { ...state.Alert, message: action.payload.message, type: action.payload.type } };
        }

        case con.SUBMIT_FORM:
            return { ...state, login: '', password: '' };

        default:
            return state;
    }

}