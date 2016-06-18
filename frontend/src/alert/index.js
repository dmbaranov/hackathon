import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

import './style.scss'

export default class AlertComponent extends Component {

    render = () => {
		let title = '', body = '';
		if (this.props.message !== '') {
			if (typeof this.props.message.title !== 'undefined') {
				title = this.props.message.title;
			}

			if (typeof this.props.message.exception !== 'undefined' && typeof this.props.message.exception.message !== 'undefined') {
				body = this.props.message.exception.message;
			}
			else if (typeof this.props.message === 'string') {
				body = this.props.message;
			}
		}
        return (
			<Alert bsStyle={ this.props.type } className="alert-component">
				<h4>{ title }</h4>
				<p>{ body }</p>
			</Alert>
        )
	};

}