import React, { Component } from 'react'
import { Form, FormGroup, FormControl , ControlLabel, Button } from 'react-bootstrap'
import { v4 } from 'node-uuid'

import './style.scss'

export default class FormComponent extends Component {

    render = () => {

        console.log(this.props);
        
        let formData = this.props.data[0].map((item, number) => {
            if(item.type === 'select' && item.options.length !== 0) {

                let options = item.options.map(option => {
                    return <option key={ v4() } value={ option.id } disabled={ option.isDisabled }>{ option.id }</option>
                });
                
                return (
                    <FormGroup key={ number }>
                        <ControlLabel>{ item.name }</ControlLabel>
                        <FormControl componentClass="select" { ...item.attributes }>
                            { options }
                        </FormControl>
                    </FormGroup>
                )
            }
            else {
                return (
                    <FormGroup key={ number } validationState={ item.validationState }>
                        <ControlLabel>{ item.name }</ControlLabel>
                        <FormControl type={ item.type } { ...item.attributes }/>
                        <FormControl.Feedback />
                    </FormGroup>
                )
            }
        });

        return (
            <Form onSubmit={ this.props.data[1][0].formOnSubmit }>
                { formData }
                <Button type={ this.props.data[1][0].buttonType } { ...this.props.data[1][0].attributes }>{ this.props.data[1][0].buttonText }</Button>
            </Form>
        )
    }

}