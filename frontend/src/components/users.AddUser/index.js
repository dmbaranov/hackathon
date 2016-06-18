/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from '../common.Form'

import * as con from '../../constants/users.AddUser'

export default class AddUser extends Component {
    
    handleInput = (inputName, e) => {
        this.props.dispatch({
            type: inputName,
            payload: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch({
            type: con.SUBMIT_ADD_FORM,
            payload: {
                token: this.props.user.token,
                email: this.props.addUser.email,
                login: this.props.addUser.login,
                phone: this.props.addUser.phone,
                password: this.props.addUser.password,
                password_confirmation: this.props.addUser.password_confirmation,
                department_id: this.props.addUser.department_id
            }
        })
    };

    render = () => {
        const { email, login, phone, password, password_confirmation, department_id } = this.props.addUser;

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
                type: 'text',
                name: 'Department ID',
                attributes: {
                    value: department_id,
                    onChange: this.handleInput.bind(this, con.DEPARTMENT_INPUT)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Add user',
                formOnSubmit: this.handleSubmit
            }]
        ];

        return (
            <div className='row'>
                <Form data={ formData }/>
            </div>
        )
    };
    
}

function mapStateToProps(state) {
    return {
        user: state.user,
        addUser: state.addUser
    }
}

export default connect(mapStateToProps)(AddUser);
/*eslint-enable*/