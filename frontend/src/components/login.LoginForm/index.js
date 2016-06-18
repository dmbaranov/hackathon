/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from '../common.Form'

import * as conLogin from '../../constants/login.LoginForm'
import * as conUser from '../../constants/common.User'

export default class LoginForm extends Component {
    
    handleInput = (inputName, e) => {
        this.props.dispatch({
            type: inputName,
            payload: {
                value: e.target.value
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: conLogin.SUBMIT_FORM,
                payload: {
                    login: this.props.loginForm.login,
                    password: this.props.loginForm.password,
                    onResolve: resolve,
                    onReject: reject
                }
            });
        }).then(response => {
            this.props.dispatch({
                type: conUser.LOGIN_SUCCESS,
                payload: {
                    data: response
                }
            });
        }).catch(error => {
            console.log(error);
        });
    };

    handleCloseSession = (e) => {
        e.preventDefault();

        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: conLogin.CLOSE_SESSION,
                payload: {
                    token: this.props.user.token,
                    onResolve: resolve,
                    onReject: reject
                }
            });
        }).then(() => {
            this.props.dispatch({
                type: conUser.LOGOUT_SUCCESS
            });
        }).catch(error => {
            console.log(error);
        });
    };

    render = () => {

        const { login, password } = this.props.loginForm;

        const formDataForAuthenticated = [
            [{
                type: 'text',
                name: 'Login',
                attributes: {
                    value: login,
                    onChange: this.handleInput.bind(this, conLogin.LOGIN_INPUT)
                }
            },
            {
                type: 'password',
                name: 'Password',
                attributes: {
                    value: password,
                    onChange: this.handleInput.bind(this, conLogin.PASSWORD_INPUT)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Login',
                formOnSubmit: this.handleSubmit
            }]
        ];

        const formDataForGuest = [
            [],
            [{
                buttonType: 'submit',
                buttonText: 'Exit',
                formOnSubmit: this.handleCloseSession
            }]
        ];

        return (
            <div>
                { !this.props.user.isAuthenticated ? <Form data={ formDataForAuthenticated } /> : <Form data={ formDataForGuest }/> }
            </div>
        )

    };
    
}

function mapStateToProps(state) {
    return {
        loginForm: state.loginForm,
        user: state.user
    }
}

export default connect(mapStateToProps)(LoginForm);
/*eslint-enable*/