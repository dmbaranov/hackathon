import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Grid, Row, Col, Panel, Accordion } from 'react-bootstrap'

import NavigationLink from '../navigationLink'

import './style.scss'

export default class App extends Component {

    render = () => {
        return (
            <Grid componentClass="div" fluid={ true }>
                <Row componentClass="div">
                    <Col xs={ 2 } componentClass="aside" className="left-menu">
                        <h3 className="left-menu__title">Menu</h3>
                        <div className="left-menu__menu-items">
                            <Panel className="left-menu__item">
                                <NavigationLink onlyActiveOnIndex={ true } to="/">Main</NavigationLink>
                            </Panel>
                            <Accordion>
                                <Panel header="User control" eventKey="1">
                                    <NavigationLink to="/users/list" className="left-menu__nav-item">List of users</NavigationLink>
                                    <NavigationLink to="/users/add" className="left-menu__nav-item">Create new user</NavigationLink>
                                </Panel>
                                <Panel header="Department control" eventKey="2">
                                    <NavigationLink to="/departments/list" className="left-menu__nav-item">List of departments</NavigationLink>
                                    <NavigationLink to="/departments/add" className="left-menu__nav-item">Create new department</NavigationLink>
                                </Panel>
                            </Accordion>
                        </div>
                        <div className="left_menu__login">
                            <h4>
                                <Link to="/login">
                                    { !this.props.login.User.isAuthenticated ? 'login' : 'Logout' }
                                </Link>
                            </h4>
                        </div>
                    </Col>
                    <Col xs={ 10 } xsOffset={ 2 } componentClass="section" className="main-area">
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