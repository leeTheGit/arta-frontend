import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    render() {
        return <Redirect to="/" />;
    }
}


export default Logout;