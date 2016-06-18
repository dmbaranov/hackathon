import * as con from '../constants/common.User'

const initialState = {
    isAuthenticated: window.localStorage.getItem('token') === null ? false : true,
    token: window.localStorage.getItem('token'),
    onResolve: '',
    onReject: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {

        case con.LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, token: action.payload.data.session.authentication_token };

        case con.LOGOUT_SUCCESS:
            return { ...state, isAuthenticated: false, token: null };
        
        default:
            return state;
    }
}