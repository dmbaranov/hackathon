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

function fetchUserListRequest(token) {
	return (
        fetch('http://localhost:3001/api/api/v1/users.json', {
            method: 'GET',
            headers: {
                'X-Authentication-Token': token
            }
        })
	)
}

function updateUserRequest(token, id, email, phone, login, password) {

    const editUserData = JSON.stringify({
        id: id,
        user: {
            email: email,
            phone: phone,
            login: login,
            password: password
        }
	});

	return (
        fetch(`http://localhost:3001/api/api/v1/users/${ id }.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': token
            },
            body: editUserData
        })
	)

}

function deleteUserRequest(token, id) {
	return (
        fetch(`http://localhost:3001/api/api/v1/users/${ id }.json`, {
            method: 'DELETE',
            headers: {
                'X-Authentication-Token': token
            }
        })
	)
}

function addProfileRequest(token, userID, departmentID) {

        const editProfileData = JSON.stringify({
            user_id: userID,
            profile: {
                department_id: departmentID
            }
        });

        return (
            fetch(`http://localhost:3001/api/api/v1/users/${ userID }/profiles.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Authentication-Token': token
                },
                body: editProfileData
            })
        )
}

function deleteProfileRequest(token, userID, departmentID) {
	return (
        fetch(`http://localhost:3001/api/api/v1/users/${ userID }/profiles/${ departmentID }.json`, {
            method: 'DELETE',
            headers: {
                'X-Authentication-Token': token
            }
        })
	)
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

export function fetchUserList(token) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_FETCH_USERS_STATE
		});

		fetchUserListRequest(token).then(response => {

			if (response.status === 200) {
				response.json().then(data => {
					dispatch({
						type: con.UPDATE_LIST,
						payload: {
							data: data
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

		}).then(() => {
			dispatch({
				type: con.RESET_BUTTON_FETCH_USERS_STATE
			});
		});
	}
}

export function showUpdateWindow(user) {
	return dispatch => {
		dispatch({
			type: con.SET_ACTIVE_USER,
			payload: {
				user: user
			}
		});
	}
}

export function handleInput(inputName, value) {
	return dispatch => {
		dispatch({
			type: inputName,
			payload: {
				value: value
			}
		})
	}
}

export function submitUpdateMainForm(token, user) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_UPDATE_USER_MAIN_STATE
		});

		updateUserRequest(token, user.id, user.email, user.phone, user.login, user.password).then(response => {

			if (response.status === 200) {
				console.log('Successfully updated')

                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });

                dispatch({
                    type: con.SET_ALERT_MESSAGE,
                    payload: {
                        type: 'success',
                        message: 'User has been updated successfully'
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
				type: con.RESET_BUTTON_UPDATE_USER_MAIN_STATE
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

export function submitUpdateProfilesForm(token, userID, departmentID) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_ADD_PROFILE_STATE
		});

		addProfileRequest(token, userID, departmentID).then(response => {

			if (response.status == 201) {
				console.log('Successfully updated');

                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });

                dispatch({
                    type: con.SET_ALERT_MESSAGE,
                    payload: {
                        type: 'success',
                        message: 'Profilse has been added successfully'
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
				type: con.RESET_BUTTON_ADD_PROFILE_STATE
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

export function deleteUser(token, id) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_DELETE_USER_STATE
		});

		deleteUserRequest(token, id).then(response => {

			if (response.status === 200) {
				console.log('Successfully deleted');

                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });

                dispatch({
                    type: con.SET_ALERT_MESSAGE,
                    payload: {
                        type: 'success',
                        message: 'User has been deleted successfully'
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
				type: con.RESET_BUTTON_DELETE_USER_STATE
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

export function deleteProfile(token, userID, departmentID) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_DELETE_PROFILE_STATE
		});

		deleteProfileRequest(token, userID, departmentID).then(response => {

			if (response.status === 200) {
				console.log('Successfully deleted');

                dispatch({
                    type: con.RESET_ALERT_VISIBILITY
                });

                dispatch({
                    type: con.SET_ALERT_MESSAGE,
                    payload: {
                        type: 'success',
                        message: 'Profile has been deleted successfully'
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
				type: con.RESET_BUTTON_DELETE_PROFILE_STATE
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








