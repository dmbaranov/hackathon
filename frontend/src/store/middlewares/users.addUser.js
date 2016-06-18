/* eslint-disable */
import * as con from '../../constants/users.AddUser'

export const addUser = storeParam => next => action => {

    if (action.type == con.SUBMIT_ADD_FORM) {

        const addUserData = JSON.stringify({
            user: {
                email: action.payload.email,
                phone: action.payload.phone,
                login: action.payload.login,
                password: action.payload.password,
                password_confirmation: action.payload.password_confirmation
            },
            department_id: action.payload.department_id
        });

        fetch('http://localhost:3001/api/api/v1/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': action.payload.token
            },
            body: addUserData
        }).then((response) => {
            if (response.status === 201) {
                console.log('Successfully added!');
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