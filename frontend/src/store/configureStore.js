import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import { loginForm } from './middlewares/login.loginForm'
import { addUser } from './middlewares/users.addUser'
import { userList } from './middlewares/users.userList'
import { departmentsList } from './middlewares/deps.departmentsList'
import { addDepartment } from './middlewares/deps.addDepartment'

export default function configureStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, loginForm, userList, addUser, departmentsList, addDepartment)
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        })
    }

    return store;
}