/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

import './style.scss'

export default class App extends Component {

    render = () => {
        return (
            <Grid componentClass="div" fluid={ true }>
                <Row componentClass="div">
                    {/*<Col xs={ 2 } componentClass="aside" className="left-menu">
                        <h3 className="left-menu__title">Menu</h3>
                        <div className="left-menu__menu-items">
                            <Panel className="left-menu__item">
                                <Link onlyActiveOnIndex={ true } to="/">Main</Link>
                            </Panel>
                        </div>
                    </Col>*/}
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

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(App);