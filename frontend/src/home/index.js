import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

import './style.scss'

export default class Home extends Component {

    render = () => {
        return (
            <Col componentClass="div" xs={ 12 } className="home">
                Welcome to control center!
            </Col>
        )
    };

}