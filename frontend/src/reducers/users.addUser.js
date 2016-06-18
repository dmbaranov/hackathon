import * as con from '../constants/users.AddUser'

const initialState = {
    email: '',
    password: '',
    phone: '',
    login: '',
    password_confirmation: '',
    department_id: ''
};

export default function addUser(state = initialState, action) {
    switch (action.type) {
        
        case con.EMAIL_INPUT:
            return { ...state, email: action.payload };

        case con.PHONE_INPUT:
            return { ...state, phone: action.payload };

        case con.LOGIN_INPUT:
            return { ...state, login: action.payload };
        
        case con.PASSWORD_INPUT:
            return { ...state, password: action.payload };
        
        case con.PASSWORD_CONFIRM_INPUT:
            return { ...state, password_confirmation: action.payload };
        
        case con.DEPARTMENT_INPUT:
            return { ...state, department_id: action.payload };

        case con.SUBMIT_ADD_FORM:
            return { ...state, email: '', phone: '', login: '', password: '', password_confirmation: '', department_id: '' };
        
        default:
            return state;
    }
}
