import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

import './style.scss'

export default class WrongProfession extends Component {

    render = () => {
        return (
            <Col componentClass="div" xs={ 12 } className="wrong-profession">
                Section for this profession is under development!
            </Col>
        )
    };

}