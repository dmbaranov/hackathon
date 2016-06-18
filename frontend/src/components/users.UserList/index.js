/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SkyLight from 'react-skylight'

import Form from '../common.Form'

import * as con from '../../constants/users.UserList'
import './style.scss'

export default class UserList extends Component {
    
    fetchList = () => {
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: con.FETCH_LIST,
                payload: {
                    token: this.props.user.token,
                    onResolve: resolve,
                    onReject: reject
                }
            });
        }).then(response => {
            this.props.dispatch({
                type: con.UPDATE_LIST,
                payload: {
                    data: response
                }
            });
        }).catch(error => {
            console.log(error);
        });

    };

    showUpdateWindow = (user) => {
        this.props.dispatch({
            type: con.SET_ACTIVE_USER,
            payload: {
                user: user
            }
        });
        this.refs.editWindow.show();
    };

    handleInput = (inputName, e) => {
        this.props.dispatch({
            type: inputName,
            payload: {
                value: e.target.value
            }
        });
    };
    
    handleSubmitUpdateForm = () => {
        this.props.dispatch({
            type: con.SUBMIT_UPDATE_FORM,
            payload: {
                token: this.props.user.token,
                user: this.props.userList.activeUser
            }
        });
    };

    handleDeleteUser = (userID) => {
        this.props.dispatch({
            type: con.DELETE_USER,
            payload: {
                token: this.props.user.token,
                id: userID
            }
        });
    };

    render = () => {
        const { id, email, login, password, phone } = this.props.userList.activeUser;

        const formData = [
            [{
                type: 'text',
                name: 'ID',
                attributes: {
                    value: id,
                    readOnly: true
                }
            },
            {
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
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Apply edit',
                formOnSubmit: this.handleSubmitUpdateForm
            }]
        ];

        let users = this.props.userList.data.map((user, index) => {
            let userObject = {
                id: user.id,
                email: user.email,
                phone: user.phone,
                login: user.login,
                password: user.password
            };
            
            return (
                <tr key={ index }>
                    <td>{ user.id }</td>
                    <td>{ user.email }</td>
                    <td>{ user.phone }</td>
                    <td>{ user.login }</td>
                    <td>{ user.profiles.length }</td>
                    <td><input type="button" value="Edit" onClick={ this.showUpdateWindow.bind(this, userObject) }/></td>
                    <td><input type="button" value="Delete" onClick={ this.handleDeleteUser.bind(this, user.id) }/> </td>
                </tr>
            )
        });

        return (
            <div className="container">
                <input type="button" value="Get list" onClick={ this.fetchList }/>
                <table id="myTable" className="draggable">

                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Login</td>
                            <td>Amount of departments</td>
                            <td>Edit user</td>
                            <td>Delete user</td>
                        </tr>
                    </thead>

                    <tbody>
                        { users }
                    </tbody>

                </table>

                <SkyLight hideOnOverlayClicked ref="editWindow" title="Edit user">
                    <Form data={ formData }/>
                </SkyLight>
            </div>
        )
    };

}

function mapStateToProps(state) {
    return {
        userList: state.userList,
        user: state.user
    }
}

export default connect(mapStateToProps)(UserList);

/*eslint-enable*/