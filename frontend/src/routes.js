import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './home'

import LoginForm from './login'

import AddUser from './addUser'
import UserList from './userList'

import DepartmentsList from './departmentsList'
import AddDepartment from './addDepartment'

import NotFound from './notFound'
import requireAuthentication from './authComponent'

export const routes = (
    <div>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="/users">
                <Route path="/users/add" component={ requireAuthentication(AddUser) }/>
                <Route path="/users/list" component={ requireAuthentication(UserList) }/>
            </Route>
            <Route path="/departments">
                <Route path="/departments/list" component={ requireAuthentication(DepartmentsList) }/>
                <Route path="/departments/add" component={ requireAuthentication(AddDepartment) }/>
            </Route>
            <Route path="/login" component={ LoginForm }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    </div>
);