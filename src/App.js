import React, { Component } from 'react';
import { Route, Switch }    from 'react-router-dom';
import * as actionTypes     from './store/actions';
import Locations            from './containers/Locations';
import Layout               from './components/Layout/Layout';
import Logout               from './containers/Login/Logout/Logout';
import Plants               from './containers/Plants/Plants';
import Login                from './containers/Login/Login';
import Users                from './containers/Users/Users';
import store                from './store/store';
import Rooms                from './containers/Room';
import Plant                from './containers/Plants/Single_plant';
import axios                from 'axios';
import Home                 from './containers/Home/Home';

store.subscribe(axiosListener);

axios.defaults.baseURL = 'http://arta-api.io';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

axios.interceptors.response.use(function (response) {
    if (response.status === 500) {
        return Promise.reject(response);
    }
    return response;
}, function (error) {

    return Promise.reject(error);
});

window.axios = axios;

if (username && password) {

    store.dispatch({type: actionTypes.LOGIN, login: {username, password}});
    
    window.axios.myInterceptor = axios.interceptors.request.use( config => {
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
    if (!state.username && !state.password) {
        window.axios.interceptors.request.eject(axios.myInterceptor);
    }
    else {
        // const username = state.username;
        // const password = state.password;

        window.axios.myInterceptor = window.axios.interceptors.request.use( config => {
            const newState = store.getState();
            config['withCredentials'] = true;
            config['auth'] = { username: newState.username, password: newState.password };
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}



class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact       component={Home} />
                        <Route path="/users"        component={Users} />
                        <Route path="/plants"       component={Plants} />
                        <Route path="/plant/:id"    component={Plant} />
                        <Route path="/Rooms"        component={Rooms} />
                        <Route path="/Locations"    component={Locations} />
                        <Route path="/login"        component={Login} />
                        <Route path="/Logout"       component={Logout} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
