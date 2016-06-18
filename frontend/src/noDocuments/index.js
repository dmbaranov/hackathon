import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class NoDocuments extends Component {

    render = () => {
        return (
            <Col componentClass="div" xs={ 12 } className="wrong-profession">
                No documents
            </Col>
        )
    };

}