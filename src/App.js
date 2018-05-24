import React, { Component } from 'react';
import { Route, Switch }    from 'react-router-dom';
import Layout               from './components/Layout/Layout';
import Logout               from './containers/Login/Logout/Logout';
import Plants               from './containers/Plants/Plants';
import Login                from './containers/Login/Login';
import Users                from './containers/Users/Users';
import axios                from 'axios';
import store                from './store/store';
import Home                 from './containers/Home/Home';
import * as actionTypes     from './store/actions';

store.subscribe(axiosListener);

axios.defaults.baseURL = 'http://arta-api.io';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

if (username && password) {
    axios.interceptors.request.use( config => {
        config['withCredentials'] = true;
        config['auth'] = { username, password };
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    // store.dispatch({type: actionTypes.LOGIN, login: {username:user, password:pass}})
}

function axiosListener() {
    const state = store.getState();
    const username = state.username;
    const password = state.password;
    axios.interceptors.request.use( config => {
        config['withCredentials'] = true;
        config['auth'] = { username, password };
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
}



class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/users"  component={Users} />
                        <Route path="/plants" component={Plants} />
                        <Route path="/login"  component={Login} />
                        <Route path="/Logout" component={Logout} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
