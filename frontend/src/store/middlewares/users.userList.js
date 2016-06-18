/* eslint-disable */
import * as con from '../../constants/users.UserList'

export const userList = storeParam => next => action => {
    if (action.type === con.FETCH_LIST) {

        fetch('http://localhost:3001/api/api/v1/users.json', {
            method: 'GET',
            headers: {
                'X-Authentication-Token': action.payload.token
            }
        }).then((response) => {
            if(response.status === 200) {
                response.json().then(data => {
                    action.payload.onResolve(data);
                });
            }
            else {
                response.json().then(data => {
                    action.payload.onReject(data);
                });
            }
        });
        
    }
        
    else if (action.type === con.SUBMIT_UPDATE_FORM) {

        const editUserData = JSON.stringify({
            user: {
                email: action.payload.user.email,
                phone: action.payload.user.phone,
                login: action.payload.user.login,
                password: action.payload.user.password
            }
        });

        fetch(`http://localhost:3001/api/api/v1/users/${ action.payload.user.id }.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': action.payload.token
            },
            body: editUserData
        }).then(response => {
            if (response.status === 200) {
                console.log('User was successfully updated!');
            }
            else {
                response.json().then(data => {
                    console.log('Error!');
                    console.log(data);
                });
            }
        });

    }
    
    else if (action.type === con.DELETE_USER) {

        fetch(`http://localhost:3001/api/api/v1/users/${ action.payload.id }.json`, {
            method: 'DELETE',
            headers: {
                'X-Authentication-Token': action.payload.token
            }
        }).then(response => {
            if (response.status === 200) {
                console.log('Successfully deleted!');
            }
            else {
                response.json().then(data => {
                    console.log('Error!');
                    console.log(data);
                });
            }
        });
    }

    return next(action);
};
/* eslint-enable */