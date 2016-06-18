import React, { Component } from 'react'

import ComponentLink from '../../components/common.ComponentLink'

export default class UserControl extends Component {

    render = () => {
        const links = [
            {
                name: 'List of users',
                link: '/users/list'
            },
            {
                name: 'Create new user',
                link: '/users/add'
            }

        ];

        return (
            <div className="container">
                <h3>User control center</h3>
                <ComponentLink links={ links }/>
                { this.props.children }
            </div>
        )
    }
}