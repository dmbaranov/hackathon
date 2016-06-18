import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { v4 } from 'node-uuid'
import { Col, Button, Table, Tabs, Tab, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

import FormComponent from '../form'
import AlertComponent from '../alert'

import * as con from './constants'
import * as actions from './actions.js'
import './style.scss'

export default class UserList extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            modalShow: false
        };
    }

    componentWillMount = () => {
        this.props.actions.componentMount(this.props.login.User.token);
    };

    fetchUserList = () => {
        this.props.actions.fetchUserList(this.props.login.User.token);
    };

    showUpdateWindow = (user) => {
        this.props.actions.showUpdateWindow(user);
        this.modalOpen();
    };

    handleInput = (inputName, e) => {
        this.props.actions.handleInput(inputName, e.target.value);
    };

    handleSubmitUpdateMainForm = (e) => { //main form is a form with email, phone, password etc.
        e.preventDefault();

        this.props.actions.submitUpdateMainForm(this.props.login.User.token, this.props.userList.activeUser);
    };

    handleSubmitUpdateProfilesForm = (e) => { //profiles form is a form with user's profiles
        e.preventDefault();

        this.props.actions.submitUpdateProfilesForm(this.props.login.User.token, this.props.userList.activeUser.id, this.props.userList.department_id);
    };

    handleDeleteUser = (userID, e) => {
        e.preventDefault();

        this.props.actions.deleteUser(this.props.login.User.token, userID);
    };
    
    handleDeleteDepartment = (departmentID) => {
        this.props.actions.deleteProfile(this.props.login.User.token, this.props.userList.activeUser.id, departmentID)
    };

    modalOpen = () => {
        this.setState({
            modalShow: true
        });
    };

    modalClose = () => {
        this.setState({
            modalShow: false
        });
    };

    render = () => {
        const { id, email, login, password, phone, profiles } = this.props.userList.activeUser;
        const { department_id, departmentsList, 
                isButtonFetchUsersDisabled, isButtonUpdateUserMainDisabled, 
                isButtonDeleteUserDisabled, isButtonAddProfileDisabled, 
                isButtonDeleteProfileDisabled, Alert } = this.props.userList;

        const formMainData = [
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
                formOnSubmit: this.handleSubmitUpdateMainForm,
                attributes: {
                    disabled: isButtonUpdateUserMainDisabled
                }
            }]
        ];

        const formProfilesData = [
            [{
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
                buttonText: 'Add department',
                formOnSubmit: this.handleSubmitUpdateProfilesForm,
                attributes: {
                    disabled: isButtonAddProfileDisabled
                }
            }]
        ];

        const formDeleteUserData = [
            [],
            [{
                buttonType: 'submit',
                buttonText: 'Delete',
                formOnSubmit: this.handleDeleteUser.bind(this, id),
                attributes: {
                    bsStyle: 'danger',
                    disabled: isButtonDeleteUserDisabled
                }
            }]
        ];

        let users = this.props.userList.data.map(user => { //list of all users
            let userObject = {
                id: user.id,
                email: user.email,
                phone: user.phone,
                login: user.login,
                password: user.password,
                profiles: user.profiles
            };

            if (typeof user.profiles !== 'undefined') {
                var profiles = user.profiles.map(department => {
                    return <p key={ v4() }>{ department.department_id }</p>
                })
            }

            return (
                <tr key={ v4() }>
                    <td>{ user.id }</td>
                    <td>{ user.email }</td>
                    <td>{ user.phone }</td>
                    <td>{ user.login }</td>
                    <td>{ profiles }</td>
                    <td className="user-list__table-td-button"><Button bsStyle="primary" onClick={ this.showUpdateWindow.bind(this, userObject) }>Edit</Button></td>
                </tr>
            )
        });

        let activeUserProfiles = null; //list of profiles of active user. we display it on the profiles tab
        if (this.props.userList.activeUser.profiles !== '') {
            activeUserProfiles = this.props.userList.activeUser.profiles.map(item => {
                return (
                    <Col xs={ 12 } key={ v4() } className="user-list__user-profiles__profile">
                        <Col xs={ 6 }>
                            { item.department_id }
                        </Col>
                        <Col xsOffset={ 1 }>
                            <Button bsStyle="danger" onClick={ this.handleDeleteDepartment.bind(this, item.id) } disabled={ isButtonDeleteProfileDisabled }>Delete</Button>
                        </Col>
                    </Col>
                )
            });
        }

        let isUserInCurrentProfile = false;

        if (typeof profiles === 'object') {
            profiles.forEach(item => {
                if (item.department_id === department_id) {
                    isUserInCurrentProfile = true;
                }
            });
        }

        return (
            <Col componentClass="div" xs={ 12 } className="user-list">
                <Col componentClass="div" xs={ 12 } className="user-list__block">
                    <Button onClick={ this.fetchUserList } disable={ isButtonFetchUsersDisabled }>Get list</Button>
                </Col>
                <Col componentClass="div" xs={ 12 } className="user-list__block">
                    <Table id="myTable" className="draggable" responsive striped bordered condensed hover>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Login</td>
                            <td>Departments</td>
                            <td>Edit user</td>
                        </tr>
                        </thead>

                        <tbody>
                        { users }
                        </tbody>
                    </Table>

                    <Modal show={ this.state.modalShow } onHide={ this.modalClose }>
                        <ModalHeader closeButton>
                            <ModalTitle>Edit user</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Tabs id={ v4() } defaultActiveKey={ 1 }>
                                <Tab eventKey={ 1 } title="Main">
                                    <FormComponent data={ formMainData }/>
                                </Tab>
                                <Tab eventKey={ 2 } title="Profiles">
                                    <Col xs={ 12 } className="user-list__user-profiles">
                                        { activeUserProfiles }
                                    </Col>
                                    <FormComponent data={ formProfilesData }/>
                                    <span hidden={ !isUserInCurrentProfile }>Current user is in this department already</span>
                                </Tab>
                                <Tab eventKey={ 3 } title="Delete" className="user-list__delete-tab">
                                    <Col xs={ 12 } className="user-list__delete-user">
                                        <FormComponent data={ formDeleteUserData }/>
                                    </Col>
                                </Tab>
                            </Tabs>
                        </ModalBody>
                    </Modal>
                </Col>
                { Alert.isVisible ? <AlertComponent message={ Alert.message } type={ Alert.type }/> : <div></div> }
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        userList: state.userList,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);