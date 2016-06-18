/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from '../common.Form'

import * as con from '../../constants/deps.AddDepartment'

export default class AddDepartment extends Component {
    
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

        this.props.dispatch({
            type: con.SUBMIT_ADD_FORM,
            payload: {
                token: this.props.user.token,
                registrationAllowed: this.props.addDepartment.registrationAllowed,
                parent_id: this.props.addDepartment.parent_id,
                title: this.props.addDepartment.title,
                description: this.props.addDepartment.description
            }
        });
    };

    render = () => {
        const { registrationAllowed, parent_id, title, description } = this.props.addDepartment;

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
                type: 'text',
                name: 'Parent ID: ',
                attributes: {
                    value: parent_id,
                    onChange: this.handleInput.bind(this, con.PARENT_ID_INPUT)
                }
            },
            {
                type: 'checkbox',
                name: 'Is registration allowed: ',
                attributes: {
                    value: registrationAllowed,
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
            <div className='row'>
                <Form data={ formData } />
            </div>
        )
    };
    
}

function mapStateToProps(state) {
    return {
        user: state.user,
        addDepartment: state.addDepartment
    }
}

export default connect(mapStateToProps)(AddDepartment);

/*eslint-enable*/