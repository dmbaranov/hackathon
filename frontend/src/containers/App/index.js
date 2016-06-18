/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavLink from '../../components/common.NavLink'

export default class App extends Component {




    /*getNestedChildren = (arr) => {
        let result = [];
        for(let i = 0; i < arr.length; i++) {
            result.push(arr[i]);
            result[i].children = [];
        }

        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr.length; j++) {
                if(typeof result[j] != 'undefined' && typeof result[i] != 'undefined' && result[i].id === result[j].parent_id) {
                    result[i].children.push(result.splice(j, 1));
                }
            }
        }
        return result;
    };*/



    render = () => {

        /*let data = [
            {id: 1, title: 'hello', parent: 0},
            {id: 2, title: 'hello', parent: 0},
            {id: 3, title: 'hello', parent: 1},
            {id: 4, title: 'hello', parent: 3},
            {id: 5, title: 'hello', parent: 4},
            {id: 6, title: 'hello', parent: 4},
            {id: 7, title: 'hello', parent: 3},
            {id: 8, title: 'hello', parent: 2}
        ];

        let tempData = this.getNestedChildren(data);

        console.log(tempData);*/


        return (
            <div className="container">
                <h1>Control center</h1>
                <ul className="nav nav-pills">
                    <li><NavLink onlyActiveOnIndex={ true } to="/">Main</NavLink></li>
                    <li><NavLink to="/users">User control</NavLink></li>
                    <li><NavLink to="/departments">Departments control</NavLink></li>
                    <li><NavLink to="/login">{ this.props.user.isAuthenticated === true ? 'Logout' : 'Login' }</NavLink></li>
                </ul>
                { this.props.children }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App)
/*eslint-enable*/