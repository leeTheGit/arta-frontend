import axios            from 'axios';


export const LOGIN              = 'LOGIN';
export const LOGOUT             = 'LOGOUT';
export const LOGIN_ERROR        = 'LOGIN_ERROR';
export const LOGIN_ON_REFRESH   = 'LOGIN_ON_REFRESH';

export const loginResult = (authData) => {
    return {
        type: LOGIN,
        auth: authData
    }
};

export const loginError = () => {
    return {
        type: LOGIN_ERROR,
    }
};




export const login =(credentials) => {

    return dispatch => {

        return axios.get('/user/self', {
            withCredentials: true,
            auth : { username: credentials['username'], password: credentials['password']  }
        })
            .then( response => {
                console.log(response);
                const user = response.data.data;
                if (user.id) {
                    const authData = {
                        user,
                        credentials
                    }
                    dispatch(loginResult(authData));
                }

            }).catch( response => {
                dispatch(loginError());
            });
    }

};