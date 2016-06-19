/* eslint-disable */
import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import * as actions from './actions.js'

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
                <div className="home__header">
                    <div className="home__logo"></div>
                </div>
                {/*<div className="home__title">Создай себя</div>*/}
                <div className="profession-button color-1" onClick={ this.onProfessionClick.bind(this, "pilot") }>
                    <span>Пилот</span>
                </div>
                <div className="profession-button color-2" onClick={ this.onProfessionClick.bind(this, "sailor") }>
					<span>Моряк</span>
                </div>
                <div className="profession-button color-3" onClick={ this.onProfessionClick.bind(this, "austranaut") }>
					<span>Космонавт</span>
                </div>
                <div className="profession-button color-4" onClick={ this.onProfessionClick.bind(this, "driver") }>
					<span>Гонщик</span>
                </div>
                {/*<div className="home__logo"/>*/}
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