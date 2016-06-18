import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Home from './components/main.Home'
import LoginForm from './components/login.LoginForm'
import NotFound from './components/common.NotFound'
import requireAuthentication from './containers/AuthComponent'

import UserControl from './containers/UserControl'
import AddUser from './components/users.AddUser'
import UserList from './components/users.UserList'

import DepartmentsControl from './containers/DepartmentsControl'
import DepartmentsList from './components/deps.DepartmentsList'
import AddDepartment from './components/deps.AddDepartment'

export const routes = (
    <div>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="/login" component={ LoginForm }/>
            <Route path="/users" component={ requireAuthentication(UserControl) }>
                <Route path="/users/list" component={ requireAuthentication(UserList) }/>
                <Route path="/users/add" component={ requireAuthentication(AddUser) }/>
            </Route>
            <Route path="/departments" component={ requireAuthentication(DepartmentsControl) }>
                <Route path="/departments/getlist" component={ requireAuthentication(DepartmentsList) }/>
                <Route path="/departments/add" component={ requireAuthentication(AddDepartment) }/>
            </Route>
        </Route>
        <Route path="*" component={ NotFound }/>
    </div>
);