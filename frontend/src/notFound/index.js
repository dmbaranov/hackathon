import React, { Component } from 'react'
import { Link } from 'react-router'
import { Col} from 'react-bootstrap'

export default class NotFound extends Component {

    render = () => {
        return (
            <Col xs={ 12 } componentClass="div" className="not-found">
                Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
            </Col>
        )
    };

}