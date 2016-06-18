import * as con from './constants.js'

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

function addUserRequest(token, email, login, phone, password, passwordConfirmation, departmentID) {
    const addUserData = JSON.stringify({
        user: {
            email: email,
            phone: phone,
            login: login,
            password: password, 
            password_confirmation: passwordConfirmation
        },
        department_id: departmentID
    });

    return (
		fetch('http://localhost:3001/api/api/v1/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': token
            },
            body: addUserData
		})
    );
}

function handleDepartments(departments) { // creating object for [input type=select] FormComponent and disabling options for departments where registration is not allowed
    let departmentsList = departments.collection.map(item => {
		return {
			id: item.id,
			isDisabled: !item.user_registration_allowed
		}
	});

	departmentsList.unshift({
		id: '',
		isDisabled: true
	});

	return departmentsList;
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

export function handleSubmitAddForm(token, email, login, phone, password, passwordConfirmation, departmentID) { // add new user and clear form's state then
    return dispatch => {
        dispatch({
            type: con.RESET_BUTTON_STATE
        });

        addUserRequest(token, email, login, phone, password, passwordConfirmation, departmentID).then(response => {

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
                        message: 'User was successfully added!'
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
            dispatch({
                type: con.RESET_BUTTON_STATE
            });
        }).then(() => {
            setTimeout(() => {
                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });
            }, 5000);
        });
    }
}

export function generatePassword() {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    
    console.log(result);

	return dispatch => {
		dispatch({
			type: con.PASSWORD_INPUT,
			payload: {
				value: result
			}
		});

		dispatch({
			type: con.PASSWORD_CONFIRM_INPUT,
			payload: {
				value: result
			}
		});
	}
}