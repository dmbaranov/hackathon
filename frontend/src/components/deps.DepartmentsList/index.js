/*eslint-disable*/
var cx = require('classnames')
import React, { Component } from 'react'
import Tree from 'react-ui-tree'
import { connect } from 'react-redux'
import SkyLight from 'react-skylight'

import Form from '../common.Form'

import * as con from '../../constants/deps.DepartmentsList'
import './style.scss'

export default class DepartmentList extends Component {

    constructor(props) {
        super(props);
    };

    fetchList = () => {
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: con.FETCH_LIST,
                payload: {
                    token: this.props.user.token,
                    onResolve: resolve,
                    onReject: reject
                }
            });
        }).then(response => {
            this.props.dispatch({
                type: con.RENDER_LIST,
                payload: {
                    data: response
                }
            });
        }).catch(error => {
            console.log(error);
        });
    };

    handleEditDepartmentData = (inputName, e) => { //Edit data for the active department
        this.props.dispatch({
            type: inputName,
            payload: {
                value: e.target.value
            }
        });
    };

    handleRemoveDepartment = () => {
        this.props.dispatch({
            type: con.REMOVE_DEPARTMENT,
            payload: {
                active: this.props.departmentsList.active
            }
        });
    };

    handleUpdateDepartment = (e) => {    //Update active department on the server
        e.preventDefault();
        
        this.props.dispatch({
            type: con.UPDATE_DEPARTMENT,
            payload: {
                token: this.props.user.token,
                id: this.props.departmentsList.active.id,
                title: this.props.departmentsList.active.title,
                description: this.props.departmentsList.active.description,
                registrationAllowed: this.props.departmentsList.active.registrationAllowed
            }
        })
    };

    renderNode = (node) => {
        return (
            <span className={ cx('node', {'is-active': node === this.props.departmentsList.active }) }
                  onMouseDown={ this.onClickNode.bind(this, node) }>
            { node.id }
            </span>
        );
    };

    onClickNode = (node) => {
        this.props.dispatch({
            type: con.SET_NODE_ACTIVE,
            payload: {
                node: node
            }
        });
    };

    handleChange = (tree) => { //Update department's parents
        this.props.dispatch({
            type: con.UPDATE_DEPARTMENT_PARENT,
            payload: {
                token: this.props.user.token,
                data: tree.children,
                active: this.props.departmentsList.active
            }
        });
    };

    /*updateTree() {
        var tree = this.props.departmentsList.data;
        tree.children.push({module: 'test'});
        store.dispatch({
            type: con.RENDER_LIST,
            payload: {
                data: tree
            }
        });
    };*/

    render = () => {
        const { active, data } = this.props.departmentsList;
        let editWindow = null;
        
        const formData = [
            [{
                type: 'text',
                name: 'ID',
                attributes: {
                    value: active.id,
                    readOnly: true
                }
            },
            {
                type: 'text',
                name: 'Description',
                attributes: {
                    value: active.description,
                    onChange: this.handleEditDepartmentData.bind(this, con.EDIT_DEPARTMENT_DESCRIPTION)
                }
            },
            {
                type: 'text',
                name: 'Title',
                attributes: {
                    value: active.title,
                    onChange: this.handleEditDepartmentData.bind(this, con.EDIT_DEPARTMENT_TITLE)
                }
            },
            {
                type: 'checkbox',
                name: 'IS registration allowed',
                attributes: {
                    checked: active.registrationAllowed,
                    onClick: this.handleEditDepartmentData.bind(this, con.EDIT_DEPARTMENT_REGISTRATION)
                }
            }],
            [{
                type: 'submit',
                buttonText: 'Apply',
                formOnSubmit: this.handleUpdateDepartment
            }]
        ];
        
        if(this.props.departmentsList.active.id == '') {
            editWindow = (
                <p>A department wasn't chosen</p>
            )
        }
        else {
            editWindow = (
                <Form data={ formData }/>
            )
        }

        return (
            <div className="container">
                <input type="button" value="Get the list" onClick={ this.fetchList }/>
                <input type="button" value="Edit" onClick={ () => this.refs.editWindow.show() } />
                <input type="button" value="Remove" onClick={ this.handleRemoveDepartment } />

                <div className="tree">
                    <Tree
                        paddingLeft={ 20 }
                        tree={ data }
                        onChange={ this.handleChange }
                        isNodeCollapsed={ this.isNodeCollapsed }
                        renderNode={ this.renderNode }
                    />
                </div>

                <SkyLight hideOnOverlayClicked
                          ref="editWindow"
                          title="Edit department"
                >
                    { editWindow }
                </SkyLight>
                {/*<div className="inspector">
                    <button onClick={ this.updateTree.bind(this) }>update tree</button>
                    <pre>
                        {JSON.stringify(this.props.departmentsList.data, null, '  ')}
                    </pre>
                </div>*/}
            </div>
        );
    };
    
}

function mapStateToProps(state) {
    return {
        departmentsList: state.departmentsList,
        user: state.user
    }
}

export default connect(mapStateToProps)(DepartmentList);
/*eslint-enable*/