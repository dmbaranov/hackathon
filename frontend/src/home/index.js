/* eslint-disable */
import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import $ from 'jquery'

import * as actions from './actions.js'
import * as con from './constants.js'

import './style.scss'

export default class Home extends Component {

	componentWillMount = () => {
		this.props.actions.setProfession('');
	}

	onProfessionClick = (profession) => {
		this.props.actions.setProfession(profession);
		if (profession !== 'sailor') {
			browserHistory.push('/wrong');
		}
		else {
			browserHistory.push('/sailor');
		}
	}

    render = () => {
        return (
            <Col componentClass="div" xs={ 12 } className="home" >
                <div className="profession-button" onClick={ this.onProfessionClick.bind(this, "pilot") }>
                    <span>Пилот</span>
                </div>
                <div className="profession-button" onClick={ this.onProfessionClick.bind(this, "sailor") }>
					<span>Моряк</span>
                </div>
                <div className="profession-button" onClick={ this.onProfessionClick.bind(this, "austranaut") }>
					<span>Космонавт</span>
                </div>
                <div className="profession-button" onClick={ this.onProfessionClick.bind(this, "driver") }>
					<span>Водитель</span>
                </div>
            </Col>
        )
    };

}

function mapStateToProps(state) {
    return {
        home: state.home
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);