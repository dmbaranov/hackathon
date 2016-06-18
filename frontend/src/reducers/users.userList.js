import * as con from '../constants/users.UserList'

const initialState = {
    data: [],
    activeUser: '',
    email: '',
    login: '',
    phone: '',
    password: ''
};

export default function userList(state = initialState, action) {
    switch(action.type) {

        case con.UPDATE_LIST:
            return { ...state, data: action.payload.data.collection };

        case con.SET_ACTIVE_USER:
            return { ...state, activeUser: action.payload.user };

        case con.EMAIL_INPUT:
            return { ...state, activeUser: { ...state.activeUser, email: action.payload.value } };

        case con.LOGIN_INPUT:
            return { ...state, activeUser: { ...state.activeUser, login: action.payload.value } };

        case con.PHONE_INPUT:
            return { ...state, activeUser: { ...state.activeUser, phone: action.payload.value } };

        case con.PASSWORD_INPUT:
            return { ...state, activeUser: { ...state.activeUser, password: action.payload.value } };

        default:
            return state;

    }
}