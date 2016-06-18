import { combineReducers } from 'redux'

import login from '../login/reducer'
import userList from '../userList/reducer'
import addUser from '../addUser/reducer'
import departmentsList from '../departmentsList/reducer'
import addDepartment from '../addDepartment/reducer'


export default combineReducers({
    login,
    userList,
    addUser,
    departmentsList,
    addDepartment
});
