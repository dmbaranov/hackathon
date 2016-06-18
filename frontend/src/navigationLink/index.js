import React, { Component } from 'react'
import { Link } from 'react-router'

import './style.scss'

export default class NavigationLink extends Component {

    render = () => {
        return <Link { ...this.props } activeClassName="active"/>
    };

}