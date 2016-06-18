import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import FormComponent from '../form'
import AlertComponent from '../alert/'

import * as con from './constants'
import * as actions from './actions'

import './style.scss'

export default class AddDepartment extends Component {

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
            this.props.addDepartment.user_registration_allowed,
            this.props.addDepartment.parent_id,
            this.props.addDepartment.title,
            this.props.addDepartment.description
        );
    };

    render = () => {

        const { user_registration_allowed, parent_id, title, description, departmentsList, Alert } = this.props.addDepartment;

        const formData = [
            [{
                type: 'text',
                name: 'Title: ',
                attributes: {
                    value: title,
                    onChange: this.handleInput.bind(this, con.TITLE_INPUT)
                }
            },
            {
                type: 'text',
                name: 'Description: ',
                attributes: {
                    value: description,
                    onChange: this.handleInput.bind(this, con.DESCRIPTION_INPUT)
                }
            },
            {
                type: 'select',
                name: 'Department ID',
                options: departmentsList,
                attributes: {
                    value: parent_id,
                    onChange: this.handleInput.bind(this, con.PARENT_ID_SELECT)
                }
            },
            {
                type: 'checkbox',
                name: 'Is registration allowed: ',
                attributes: {
                    value: user_registration_allowed,
                    onClick: this.handleInput.bind(this, con.CHECK_REGISTRATION_ALLOWED)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Add department',
                formOnSubmit: this.handleSubmit
            }]
        ];

        return (
            <Col componentClass="div" xs={ 12 } className="add-department">
                <FormComponent data={ formData } />
                { Alert.isVisible ? <AlertComponent message={ Alert.message } type={ Alert.type }/> : <div></div> }
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        login: state.login,
        addDepartment: state.addDepartment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);