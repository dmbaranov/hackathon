/*eslint-disable*/

import * as con from '../constants/deps.DepartmentsList'

const initialState = {
    token: '',
    data: [],
    active: {
        id: '',
        title: '',
        description: '',
        registrationAllowed: false
    }
};

export default function departmentsList(state = initialState, action) {
    switch(action.type) {

        case con.FETCH_LIST:
            return { ...state, token: action.payload.token, data: action.payload.data };

        case con.RENDER_LIST:
            return { ...state, data: action.payload.data };
        
        case con.UPDATE_DEPARTMENT: {
            return { ...state, active: {} };
        }

        case con.SET_NODE_ACTIVE:
            return { ...state, active: action.payload.node };

        case con.EDIT_DEPARTMENT_ID:
            let tempID = state.active;
            tempID.id = action.payload.value;
            return { ...state, active: tempID };
            /*return { ...state, active: { ...state.active, id: action.payload.value } };*/

        case con.EDIT_DEPARTMENT_DESCRIPTION:
            return { ...state, active: { ...state.active, description: action.payload.value } };

        case con.EDIT_DEPARTMENT_TITLE:
            return { ...state, active: { ...state.active, title: action.payload.value } };

        case con.EDIT_DEPARTMENT_REGISTRATION:
            return { ...state, active: { ...state.active, registrationAllowed: !state.active.registrationAllowed } };
            
        default:
            return state;
    }
}
/*eslint-enable*/