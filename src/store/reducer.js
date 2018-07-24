import * as actionTypes from './actions/actions';


const intialState = {
    isLoggedIn: false,
    username: '',
    password:'',
    loginError: false,
    authUser: false
};

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
        localStorage.setItem('username', action.auth.credentials.username);
        localStorage.setItem('password', action.auth.credentials.password);
        localStorage.setItem('authUser', JSON.stringify(action.auth.user));

        return {
                ...state,
                isLoggedIn: true,
                username:action.auth.credentials.username,
                password:action.auth.credentials.password,
                authUser:action.auth.user
            };


        case actionTypes.LOGOUT:
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('authUser');
            return {
                ...state,
                isLoggedIn: false,
                username:'',
                password:'',
                authUser: false
            };
        

        case actionTypes.LOGIN_ON_REFRESH:
            return {
                ...state,
                isLoggedIn: true,
                authUser: action.user,

            };


        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                loginError: true,
            }

        default:
            return state;
    }
};

export default reducer;