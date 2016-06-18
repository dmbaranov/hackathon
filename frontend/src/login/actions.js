import { browserHistory } from 'react-router'

import * as con from './constants'

function serverLoginRequest(login, password) {
    const authData = JSON.stringify({
        login: login,
        password: password,
        uuid: '123',
        platform: '456'
    });

    return fetch('http://localhost:3001/api/api/v1/sessions.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: authData
    })
}

function serverLogoutRequest(token) {
    return fetch('http://localhost:3001/api/api/v1/sessions.json', {
        method: 'DELETE',
        headers: {
            'X-Authentication-Token': token
        }
    })
}

export function handleInput(inputName, value) {
    return dispatch => {
        dispatch({
            type: inputName,
            payload: {
                value: value
            }
        });
    }
}

export function handleCreateSession(login, password) {
    return dispatch => {
        dispatch({
            type: con.RESET_BUTTON_LOGIN_STATE
        });

        serverLoginRequest(login, password).then(response => {

            if (response.status === 201) {
                response.json().then(data => {
                    window.localStorage.setItem('token', data.session.authentication_token);
                    browserHistory.push('/');

                    dispatch({
                        type: con.LOGIN_SUCCESS,
                        payload: {
                            data: data
                        }
                    });

                });
            }

            else {
                response.json().then(data => { 
                    console.log('Error!');
                    console.log(data);

                    dispatch({
                        type: con.LOGIN_FAILED
                    });

                    dispatch({
                        type: con.RESET_ALERT_VISIBILITY
                    });

                    dispatch({
                        type: con.SET_ALERT_MESSAGE,
                        payload: {
                            type: 'danger',
                            message: data
                        }
                    });

                }).then(() => {
                    setTimeout(() => { //hide error message after 5 sec
                        dispatch({
                            type: con.RESET_ALERT_VISIBILITY
                        });
                    }, 5000);
                });
            }

        }).then(() => {
            dispatch({
                type: con.RESET_BUTTON_LOGIN_STATE
            });
        });
    }
}

export function handleCloseSession(token) {
    return dispatch => {

        dispatch({
            type: con.RESET_BUTTON_LOGOUT_STATE
        });

        serverLogoutRequest(token).then(response => {

            if (response.status === 200) {
                window.localStorage.removeItem('token');
                dispatch({
                    type: con.LOGOUT_SUCCESS
                });
            }

            else {
                response.json().then(data => {
                    console.log('Error!');
                    console.log(data);

                    dispatch({
                        type: con.LOGIN_FAILED
                    });

                    dispatch({
                        type: con.RESET_ALERT_VISIBILITY
                    });

                    dispatch({
                        type: con.SET_ALERT_MESSAGE,
                        payload: {
                            type: 'danger',
                            message: data
                        }
                    });

                }).then(() => {
                    setTimeout(() => { //hide error message after 5 sec
                        dispatch({
                            type: con.RESET_ALERT_VISIBILITY
                        });
                    }, 5000);
                });
            }

        }).then(() => {
            dispatch({
                type: con.RESET_BUTTON_LOGOUT_STATE
            });
        });
    }
}