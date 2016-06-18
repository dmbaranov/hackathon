/*eslint-disable*/
import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ComponentLink extends Component {
    
    render = () => {
        let links = this.props.links.map((item, number) => {
            return (
                <li key={ number }><Link to={ item.link }>{ item.name }</Link></li>
            )
        });

        return (
            <div>
                <ul>
                    { links }
                </ul>
            </div>
        )
    };

}
/*eslint-enable*/