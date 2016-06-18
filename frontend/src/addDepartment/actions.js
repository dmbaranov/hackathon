import * as con from './constants'

function fetchDepartmentsListRequest(token) { 
    return (
        fetch('http://localhost:3001/api/api/v1/departments.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': token
            }
        })
    )
}

function addDepartmentRequest(token, userRegistrationAllowed, parentID, title, description) {
    const addDepartmentData = JSON.stringify({
        department: {
            user_registration_allowed: userRegistrationAllowed,
            parent_id: parentID,
            title: title,
            description: description
        }
    });

    return (
        fetch('http://localhost:3001/api/api/v1/departments.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': token
            },
            body: addDepartmentData
        })
    );
}

function handleDepartments(departments) { // creating departments objects for FormComponent
    let departmentsList = departments.collection.map(item => {
        return {
            id: item.id,
            isDisabled: false
        }
    });

    departmentsList.unshift({
        id: '',
        isDisabled: false
    });

    return departmentsList
}

export function componentMount(token) { // fetching departments list from the server for the [input type=select] in FormComponent
    return dispatch => {
        fetchDepartmentsListRequest(token).then(response => {

            if (response.status === 200) {
                response.json().then(data => {
                    let departments = handleDepartments(data);
                    dispatch({
                        type: con.UPDATE_DEPARTMENTS_LIST,
                        payload: {
                            data: departments
                        }
                    })

                });
            }

            else {
                response.json().then(data => { 
                    console.log('Error!');
                    console.log(data);
                    
                    dispatch({
                        type: con.RESET_ALERT_VISIBILITY
                    });
                    dispatch({
                        type: con.SET_ALERT_MESSAGE,
                        payload: {
                            type: 'danger',
                            message: data
                        }
                    });
                }).then(() => {
                    setTimeout(() => { //hide error message after 5 sec
                        dispatch({
                            type: con.RESET_ALERT_VISIBILITY
                        });
                    }, 5000);
                });
            }

        });
    }
}

export function handleInput(inputName, value) { // handling input fields and updating redux store
    return dispatch => {
        dispatch({
            type: inputName,
            payload: {
                value: value
            }
        });
    }
}

export function handleSubmitAddForm(token, userRegistrationAllowed, parentID, title, description) { // add new department and clear form's state then
    return dispatch => {
        addDepartmentRequest(token, userRegistrationAllowed, parentID, title, description).then(response => {

            if (response.status === 201) {
                console.log('Successfully added!');
                dispatch({
                    type: con.CLEAR_FORM_STATE
                });

                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });

                dispatch({
                    type: con.SET_ALERT_MESSAGE,
                    payload: {
                        type: 'success',
                        message: 'Department was successfully added!'
                    }
                });

            }
            
            else {
                response.json().then(data => { 
                    console.log('Error!');
                    console.log(data);
                    
                    dispatch({
                        type: con.RESET_ALERT_VISIBILITY
                    });
                    dispatch({
                        type: con.SET_ALERT_MESSAGE,
                        payload: {
                            type: 'danger',
                            message: data
                        }
                    });
                });
            }
            
        }).then(() => {
            setTimeout(() => {
                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });
            }, 5000);
        });
    }
}