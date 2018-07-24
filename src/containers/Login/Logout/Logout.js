import React, {Component}   from 'react';
import * as actionTypes     from '../../../store/actions/actions';
import { Redirect }         from 'react-router-dom';
import store                from '../../../store/store';

class Logout extends Component {

    componentWillMount() {
        store.dispatch({type: actionTypes.LOGOUT});
    }

    render() {
        return <Redirect to="/login" />;
    }
}

export default Logout;