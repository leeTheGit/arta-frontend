import React, {Component}   from 'react';
import * as actionTypes     from '../../../store/actions';
import { Redirect }         from 'react-router-dom';
import store                from '../../../store/store';

class Logout extends Component {

    componentWillMount() {
        store.dispatch({type: actionTypes.LOGOUT});
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    render() {
        return <Redirect to="/login" />;
    }
}

export default Logout;