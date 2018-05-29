import * as actionTypes from './actions';


const intialState = {
    isLoggedIn: false,
    username: '',
    password:''
};

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:

            return {
                ...state,
                isLoggedIn: true,
                username:action.login.username,
                password:action.login.password
            };

        case actionTypes.LOGOUT:

            return {
                ...state,
                isLoggedIn: false,
                username:'',
                password:''
            };

        default:
            return state;
    }
};

export default reducer;