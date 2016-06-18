import * as con from '../constants/login.LoginForm'

const initialState = {
    login: '',
    password: '',
    onResolve: '',
    onReject: ''
};

export default function loginForm(state = initialState, action) {
    switch (action.type) {

        case con.LOGIN_INPUT:
            return { ...state, login: action.payload.value };

        case con.PASSWORD_INPUT:
            return { ...state, password: action.payload.value };

        case con.SUBMIT_FORM:
            return { ...state, login: '', password: '' };

        default:
            return state;
    }
}