/* eslint-disable */
import * as con from '../../constants/deps.AddDepartment'

export const addDepartment = storeParam => next => action => {
    if(action.type == con.SUBMIT_ADD_FORM) {

        const addDepartmentData = JSON.stringify({
            department: {
                user_registration_allowed: action.payload.registrationAllowed,
                parent_id: action.payload.parent_id,
                title: action.payload.title,
                description: action.payload.description
            }
        });



        fetch('http://localhost:3001/api/api/v1/departments.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Authentication-Token': action.payload.token
            },
            body: addDepartmentData
        }).then((response) => {
            if (response.status === 201) {
                response.json().then(data => {
                    console.log(data);
                });
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