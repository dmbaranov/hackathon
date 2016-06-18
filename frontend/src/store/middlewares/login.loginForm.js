/* eslint-disable */
import { browserHistory } from 'react-router'

import * as con from '../../constants/login.LoginForm'

export const loginForm = storeParam => next => action => {
    if (action.type == con.SUBMIT_FORM) {

        let authData = JSON.stringify({
            login: action.payload.login,
            password: action.payload.password,
            uuid: '123',
            platform: '456'
        });

        fetch('http://localhost:3001/api/api/v1/sessions.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: authData
        }).then((response) => {
            if (response.status === 201) {
                response.json().then(data => {
                    window.localStorage.setItem('token', data.session.authentication_token);
                    browserHistory.push('/');
                    
                    action.payload.onResolve(data);
                });
            }
            else {
                response.json().then(data => {
                    action.payload.onReject(data);
                });
            }
        });

    }

    else if(action.type == con.CLOSE_SESSION) {

        fetch('http://localhost:3001/api/api/v1/sessions.json', {
            method: 'DELETE',
            headers: {
                'X-Authentication-Token': action.payload.token
            }
        }).then((response) => {
            if (response.status === 200) {
                window.localStorage.removeItem('token');
                action.payload.onResolve();
            }
            else {
                response.json().then(data => {
                    action.payload.onReject(data);
                });
            }
        });
        
    }

    return next(action);
};

/* eslint-enable */