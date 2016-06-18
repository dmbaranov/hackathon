import * as con from './constants.js'

function fetchListRequest(token) {
    return (
		fetch('http://localhost:3001/api/api/v1/departments.json', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'X-Authentication-Token': token
			}
		})
    );
}

function removeDepartmentRequest(token, active) {
    return (
		fetch(`http://localhost:3001/api/api/v1/departments/${ active.id }.json`, {
            method: 'DELETE',
            headers: {
                'X-Authentication-Token': token
            }
        })
    );
}

function editDepartmentRequest(token, id, parentID, title, description, userRegistrationAllowed) {
    const editDepartmentData = JSON.stringify({
        id: id,
        department: {
            user_registration_allowed: userRegistrationAllowed,
            parent_id: parentID,
            title: title,
            description: description
        }
    });

	return (
        fetch(`http://localhost:3001/api/api/v1/departments/${ id }.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': token
            },
            body: editDepartmentData
        })
	)
}

function convertDataToTree(array, parent, tree) { // when we receive data from the server it has id-parent_id structure. this function makes an hierarchical structure

    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: null };

    var children = array.filter( child => child.parent_id == parent.id );

    if (children.length !== 0) {
        if (parent.id == null ) {
            tree = children;
        }
        else {
            parent['children'] = children
        }
        children.forEach( child => convertDataToTree(array, child));
    }

    return tree;

}

function updateParent(data, currentID, parentID = null) { // this function finds actual parent of current department
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === currentID) {
                data[i].parent_id = parentID;
                return data[i];
            }
            
            var result = updateParent(data[i].children, currentID, data[i].id);
            if (result) return result;
        }
    }
}

export function fetchList(token) {
	return dispatch => {
		dispatch({
			type: con.RESET_BUTTON_FETCH_STATE
		});

		fetchListRequest(token).then(response => {

            if (response.status === 200) {
                let result = {
                    module: '',
                    children: []
                };

                response.json().then(data => {
                    result.children = convertDataToTree(data.collection);
                    dispatch({
						type: con.RENDER_LIST,
						payload: {
							data: result
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
				type: con.RESET_BUTTON_FETCH_STATE
			});
        });
	}
}

export function editDepartmentData(inputName, value) {
	return dispatch => {
		dispatch({
			type: inputName,
			payload: {
				value: value
			}
		})
	}
}

export function removeDepartment(token, active) {
	return dispatch => {

		if (typeof active.children === 'undefined') { // if department has children, we can't delete it
			removeDepartmentRequest(token, active).then(response => {

				if (response.status === 200) {
					console.log('Successfully removed');

					dispatch({
						type: con.RESET_ALERT_VISIBILITY
					});

					dispatch({
						type: con.SET_ALERT_MESSAGE,
						payload: {
							type: 'success',
							message: 'Department has been removed successfully'
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
        else {
            console.log('This departments has children. Removing was aborted'); // TODO: add alert here
        }

	}
}

export function updateDepartment(token, id, parentID, title, description, userRegistrationAllowed) {
	return dispatch => {
		editDepartmentRequest(token, id, parentID, title, description, userRegistrationAllowed).then(response => {

			if (response.status === 200) {
				console.log('Successfully updated');

				dispatch({
					type: con.RESET_ALERT_VISIBILITY
				});

				dispatch({
					type: con.SET_ALERT_MESSAGE,
					payload: {
						type: 'success',
						message: 'Department has been updated successfully'
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

export function onClickNode(node) {
	return dispatch => {
		dispatch({
			type: con.SET_NODE_ACTIVE,
			payload: {
				node: node
			}
		});
	}
}

export function changeParent(token, data, active) {
	return dispatch => {
		let currentParentID = active.parent_id;
		let editedDepartment = updateParent(data, active.id);

		if (editedDepartment.parent_id != currentParentID) { // if department was actually changed. we check it because this function invokes even with a single click
			editDepartmentRequest(
				token, 
				editedDepartment.id,
				editedDepartment.parent_id, 
				editedDepartment.title, 
				editedDepartment.description, 
				editedDepartment.user_registration_allowed
			).then(response => {

				if (response.status === 200) {
					console.log('Successfully updated!');

					dispatch({
						type: con.RESET_ALERT_VISIBILITY
					});

					dispatch({
						type: con.SET_ALERT_MESSAGE,
						payload: {
							type: 'success',
							message: 'Department\'s parent has been updated successfully'
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
}



