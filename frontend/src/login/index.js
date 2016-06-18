import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import * as con from './constants'
import * as actions from './actions.js'

import FormComponent from '../form'
import AlertComponent from '../alert/'

import './style.scss'

export default class Login extends Component {

    handleInput = (inputName, e) => {
        this.props.actions.handleInput(inputName, e.target.value);
    };

    handleLogin = (e) => {
        e.preventDefault();
        
        this.props.actions.handleCreateSession(this.props.login.login, this.props.login.password);
    };

    handleLogout = (e) => {
        e.preventDefault();

        this.props.actions.handleCloseSession(this.props.login.User.token);
    };

    render = () => {

        const { login, password, isButtonLoginDisabled, isButtonLogoutDisabled, validationState, Alert } = this.props.login;
        
        const formDataForGuest = [
            [{
                type: 'text',
                name: 'Login',
                validationState: validationState,
                attributes: {
                    value: login,
                    placeholder: 'Login',
                    onChange: this.handleInput.bind(this, con.LOGIN_INPUT)
                }
            },
            {
                type: 'password',
                name: 'Password',
                validationState: validationState,
                attributes: {
                    value: password,
                    placeholder: 'Password',
                    onChange: this.handleInput.bind(this, con.PASSWORD_INPUT)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Login',
                formOnSubmit: this.handleLogin,
                attributes: {
                    disabled: isButtonLoginDisabled
                }
            }]
        ];

        const formDataForAuthenticated = [
            [],
            [{
                buttonType: 'submit',
                buttonText: 'Exit',
                formOnSubmit: this.handleLogout,
                attributes: {
                    disabled: isButtonLogoutDisabled
                }
            }]
        ];

        return (
            <Col componentClass="div" xs={ 12 } className="login-component">
                { this.props.login.User.isAuthenticated ? <FormComponent data={ formDataForAuthenticated } /> : <FormComponent data={ formDataForGuest }/> }
                { Alert.isVisible ? <AlertComponent message={ Alert.message } type={ Alert.type }/> : <div></div> }
            </Col>
        )

    };
}

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);