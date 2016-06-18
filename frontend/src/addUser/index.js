import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import FormComponent from '../form'
import AlertComponent from '../alert'

import * as con from './constants'
import * as actions from './actions.js'

import './style.scss'

export default class AddUser extends Component {

    componentDidMount = () => {
        this.props.actions.componentMount(this.props.login.User.token);
    };

    handleInput = (inputName, e) => {
        this.props.actions.handleInput(inputName, e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.actions.handleSubmitAddForm(
            this.props.login.User.token,
            this.props.addUser.email,
            this.props.addUser.login,
            this.props.addUser.phone,
            this.props.addUser.password,
            this.props.addUser.password_confirmation,
            this.props.addUser.department_id
        );
    };

    generatePassword = () => {
        this.props.actions.generatePassword();
    };

    render = () => {
        const { email, login, phone, password, password_confirmation, department_id, departmentsList, isButtonDisabled, Alert } = this.props.addUser;

        const formData = [
            [{
                type: 'email',
                name: 'Email',
                attributes: {
                    value: email,
                    onChange: this.handleInput.bind(this, con.EMAIL_INPUT)
                }
            },
            {
                type: 'text',
                name: 'Login',
                attributes: {
                    value: login,
                    onChange: this.handleInput.bind(this, con.LOGIN_INPUT)
                }
            },
            {
                type: 'tel',
                name: 'Phone',
                attributes: {
                    value: phone,
                    onChange: this.handleInput.bind(this, con.PHONE_INPUT)
                }
            },
            {
                type: 'password',
                name: 'Password',
                attributes: {
                    value: password,
                    onChange: this.handleInput.bind(this, con.PASSWORD_INPUT)
                }
            },
            {
                type: 'password',
                name: 'Password confirmation',
                attributes: {
                    value: password_confirmation,
                    onChange: this.handleInput.bind(this, con.PASSWORD_CONFIRM_INPUT)
                }
            },
            {
                type: 'button',
                name: '',
                attributes: {
                    defaultValue: 'Generate password',
                    onClick: this.generatePassword,
                    bsStyle: 'btn btn-primary'
                }
            },
            {
                type: 'select',
                name: 'Department ID',
                options: departmentsList,
                attributes: {
                    value: department_id,
                    onChange: this.handleInput.bind(this, con.DEPARTMENT_SELECT)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Add user',
                formOnSubmit: this.handleSubmit,
                attributes: {
                    disabled: isButtonDisabled
                }
            }]
        ];

        return (
            <Col componentClass="div" xs={ 12 } className="add-user">
                <FormComponent data={ formData }/>
                { Alert.isVisible ? <AlertComponent message={ Alert.message } type={ Alert.type }/> : <div></div> }
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        login: state.login,
        addUser: state.addUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);