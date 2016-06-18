import React, { Component } from 'react'

import ComponentLink from '../../components/common.ComponentLink'

export default class DepartmentsControl extends Component {
    render = () => {
        const links = [
            {
                name: 'List of departments',
                link: '/departments/getlist'
            },
            {
                name: 'Add new department',
                link: '/departments/add'
            }

        ];

        return (
            <div className="container">
                <h3>Departments control center</h3>
                <ComponentLink links={ links }/>
                { this.props.children }
            </div>
        )
    }
}