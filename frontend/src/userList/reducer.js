import * as con from './constants'

const initialState = {
    data: [],
    activeUser: {
        id: '',
        email: '',
        login: '',
        phone: '',
        password: '',
        profiles: ''
    },
    department_id: '',
    departmentsList: '',
    isButtonFetchUsersDisabled: false,
    isButtonUpdateUserMainDisabled: false,
    isButtonDeleteUserDisabled: false,
    isButtonAddProfileDisabled: false,
    isButtonDeleteProfileDisabled: false,
    Alert: {
        isVisible: false,
        type: '',
        message: ''
    }
};

export default function userList(state = initialState, action) {
    switch (action.type) {

        case con.UPDATE_LIST:
            return { ...state, data: action.payload.data.collection };

        case con.UPDATE_DEPARTMENTS_LIST:
            return { ...state, departmentsList: action.payload.data };

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

        case con.DEPARTMENT_SELECT:
            return { ...state, department_id: action.payload.value };

        case con.RESET_BUTTON_FETCH_USERS_STATE:
            return { ...state, isButtonFetchUsersDisabled: !state.isButtonFetchUsersDisabled };

        case con.RESET_BUTTON_UPDATE_USER_MAIN_STATE:
            return { ...state, isButtonUpdateUserMainDisabled: !state.isButtonUpdateUserMainDisabled };

        case con.RESET_BUTTON_DELETE_USER_STATE:
            return { ...state, isButtonDeleteUserDisabled: !state.isButtonDeleteUserDisabled };

        case con.RESET_BUTTON_ADD_PROFILE_STATE:
            return { ...state, isButtonAddProfileDisabled: !state.isButtonAddProfileDisabled };

        case con.RESET_BUTTON_DELETE_PROFILE_STATE:
            return { ...state, isButtonDeleteProfileDisabled: !state.isButtonDeleteProfileDisabled };

        case con.RESET_ALERT_VISIBILITY:
            return { ...state, Alert: { ...state.Alert, isVisible: !state.Alert.isVisible } };

        case con.SET_ALERT_MESSAGE: 
            return { ...state, Alert: { ...state.Alert, message: action.payload.message, type: action.payload.type } };

        case con.SUBMIT_UPDATE_MAIN_FORM:
            return { ...state };

        default:
            return state;

    }
}