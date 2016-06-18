var cx = require('classnames')
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import Tree from 'react-ui-tree'
import { connect } from 'react-redux'
import { Col, ButtonGroup, Button, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

import FormComponent from '../form'
import AlertComponent from '../alert/'

import * as con from './constants'
import * as actions from './actions.js'
import './tree.scss'
import './style.scss'

export default class DepartmentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        };
    }

    fetchList = () => {
        this.props.actions.fetchList(this.props.login.User.token);
    };

    editDepartmentData = (inputName, e) => { // Edit data for the active department
        this.props.actions.editDepartmentData(inputName, e.target.value);
    };

    removeDepartment = () => {
        this.props.actions.removeDepartment(this.props.login.User.token, this.props.departmentsList.active);
    };

    handleUpdateDepartment = (e) => {    // Update active department on the server
        e.preventDefault();

        this.props.actions.updateDepartment(
            this.props.login.User.token,
            this.props.departmentsList.active.id,
            this.props.departmentsList.active.parent_id,
            this.props.departmentsList.active.title,
            this.props.departmentsList.active.description,
            this.props.departmentsList.active.user_registration_allowed
        );
    };

    renderNode = (node) => {
        return (
            <div className={ cx('node', {'is-active': node === this.props.departmentsList.active }) }
                  onMouseDown={ this.onClickNode.bind(this, node) }>
            { node.id }
            </div>
        );
    };

    onClickNode = (node) => {
        this.props.actions.onClickNode(node);
    };

    changeParent = (tree) => { // Update department's parents by drag'n'drop
        this.props.actions.changeParent(
            this.props.login.User.token,
            tree.children,
            this.props.departmentsList.active
        );
    };

    modalOpen = () => {
        this.setState({
            modalShow: true
        });
    };

    modalClose = () => {
        this.setState({
            modalShow: false
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
        const { active, data, isButtonFetchDisabled, Alert } = this.props.departmentsList;
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
                name: 'Title',
                attributes: {
                    value: active.title,
                    onChange: this.editDepartmentData.bind(this, con.EDIT_DEPARTMENT_TITLE)
                }
            },
            {
                type: 'text',
                name: 'Description',
                attributes: {
                    value: active.description,
                    onChange: this.editDepartmentData.bind(this, con.EDIT_DEPARTMENT_DESCRIPTION)
                }
            },
            {
                type: 'checkbox',
                name: 'Is registration allowed',
                attributes: {
                    checked: active.user_registration_allowed,
                    onClick: this.editDepartmentData.bind(this, con.EDIT_DEPARTMENT_REGISTRATION)
                }
            }],
            [{
                buttonType: 'submit',
                buttonText: 'Apply',
                formOnSubmit: this.handleUpdateDepartment
            }]
        ];

        if (this.props.departmentsList.active.id == '') {
            editWindow = (
                <p>A department wasnt chosen</p>
            )
        }
        else {
            editWindow = (
                <FormComponent data={ formData }/>
            )
        }

        return (
            <Col componentClass="div" xs={ 12 } className="departments-list">
                <ButtonGroup className="departments-list__control-buttons">
                    <Button bsStyle="default" disabled={ isButtonFetchDisabled } onClick={ this.fetchList }>Get list</Button>
                    <Button bsStyle="default" onClick={ this.modalOpen }>Edit</Button>
                    <Button bsStyle="danger" onClick={ this.removeDepartment }>Remove</Button>
                </ButtonGroup>

                <div className="tree">
                    <Tree
                        paddingLeft={ 20 }
                        tree={ data }
                        onChange={ this.changeParent }
                        isNodeCollapsed={ this.isNodeCollapsed }
                        renderNode={ this.renderNode }
                    />
                </div>

                <Modal show={ this.state.modalShow } onHide={ this.modalClose }>
                    <ModalHeader closeButton>
                        <ModalTitle>Edit department</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        { editWindow }
                    </ModalBody>
                </Modal>
                {/*<div className="inspector">
                 <button onClick={ this.updateTree.bind(this) }>update tree</button>
                 <pre>
                 {JSON.stringify(this.props.departmentsList.data, null, '  ')}
                 </pre>
                 </div>*/}
                 { Alert.isVisible ? <AlertComponent message={ Alert.message } type={ Alert.type }/> : <div></div> }
            </Col>
        );
    };

}

function mapStateToProps(state) {
    return {
        departmentsList: state.departmentsList,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsList);