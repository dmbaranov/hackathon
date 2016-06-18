/* eslint-disable */
var _ = require('lodash');
import * as con from '../../constants/deps.DepartmentsList'

function convertDataToTree(array, parent, tree) {

    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: null };

    var children = _.filter( array, function(child){ return child.parent_id == parent.id; });

    if( !_.isEmpty( children )  ){
        if( parent.id == null ){
            tree = children;
        }else{
            parent['children'] = children
        }
        _.each( children, function( child ){ convertDataToTree( array, child ) } );
    }

    return tree;

}


export const departmentsList = storeParam => next => action => {

    if (action.type === con.FETCH_LIST) {

        fetch('http://localhost:3001/api/api/v1/departments.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': action.payload.token
            }
        }).then(response => {
            if (response.status === 200) {
                let result = {
                    module: '',
                    children: []
                };
                response.json().then(data => {
                    result.children = convertDataToTree(data.collection);
                    action.payload.onResolve(result);

                });
            }
            else {
                response.json().then(data => {
                    action.payload.onReject(data);
                });
            }
        });
    }

    else if (action.type === con.UPDATE_DEPARTMENT) {

        const editDepartmentData = JSON.stringify({
            id: action.payload.id,
            department: {
                user_registration_allowed: action.payload.registrationAllowed,
                title: action.payload.title,
                description: action.payload.description
            }
        });

        fetch(`http://localhost:3001/api/api/v1/departments/${ action.payload.id }.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': action.payload.token
            },
            body: editDepartmentData
        }).then(response => {
            if (response.status === 200) {
                console.log('Successfully Updated!');
            }
            else {
                response.json().then(data => {
                    console.log('Error!');
                    console.log(data);
                });
            }
        });

    }

    else if (action.type === con.UPDATE_DEPARTMENT_PARENT) {

        function updateParent(data, parentID = null) { // function for updating parentID. this one sucks becase it updates global variable

            for (let i = 0; i < data.length; i++) {
                if (typeof data[i].id !== 'undefined' && data[i].id === action.payload.active.id) {
                    edited = data[i];
                    edited.parent_id = parentID;
                    return edited;
                }
                else if (typeof data[i].children !== 'undefined' && data[i].children.length !== 0) {
                    updateParent(data[i].children, data[i].id);
                }
            }
        }

        var edited = null; // this is global variable for changing parent id
        let tempParentId = action.payload.active.parent_id; // we remember current parent_id to determine whether we should update it on the server
        updateParent(action.payload.data);


        if(edited.parent_id !== tempParentId && typeof edited !== null) {

            const editDepartmentData = JSON.stringify({ // data that will be sent on the server
                id: edited.id,
                department: {
                    user_registration_allowed: edited.registrationAllowed,
                    title: edited.title,
                    description: edited.description,
                    parent_id: edited.parent_id
                }
            });

            fetch(`http://localhost:3001/api/api/v1/departments/${ action.payload.active.id }.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Authentication-Token': action.payload.token
                },
                body: editDepartmentData
            }).then(response => {
                if (response.status === 200) {
                    console.log('Successfully updated!');
                }
                else {
                    response.json().then(data => {
                        console.log('Error!');
                        console.log(data);
                    });
                }
            });

        }
    }

    else if (action.type === con.REMOVE_DEPARTMENT) {

        function departmentsToRemove(department) {
            result.push(department.id);
            if (typeof department.children !== 'undefined') {
                for (let i = 0; i < department.children.length; i++) {
                    departmentsToRemove(department.children[i]);
                }
            }
        }

        var result = [];
        let toRemove = departmentsToRemove(action.payload.active);

        if (toRemove.length !== 0) {

            // send an array or requests in a loop

        }

    }

    return next(action);

};

/* eslint-enable */