import { combineReducers } from 'redux'
import loginForm from './login.loginForm'
import user from './common.user'
import addUser from './users.addUser'
import userList from './users.userList'
import departmentsList from './deps.departmentsList'
import addDepartment from './deps.addDepartment'

export default combineReducers({
    loginForm,
    user,
    addUser,
    userList,
    departmentsList,
    addDepartment
});
