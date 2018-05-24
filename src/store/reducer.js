import * as actionTypes from './actions';


const intialState = {
    isLoggedIn: false,
    username: '',
    password:''
};

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            console.log('in the reducer', action.login);
            return {
                ...state,
                isLoggedIn: true,
                username:action.login.username,
                password:action.login.password
            };
        default:
            return state;
    }
};

export default reducer;