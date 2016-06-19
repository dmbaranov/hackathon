import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import './style.scss'

export default class App extends Component {

    render = () => {
        return (
            <Grid componentClass="div" fluid={ true }>
                <Row componentClass="div">
                    <Col xs={ 12 } componentClass="section" className="main-area">
                        <Col xs={ 12 } componentClass="div" className="main-area__content">
                            { this.props.children }
                        </Col>
                    </Col>
                </Row>
            </Grid>
        )
    }
}