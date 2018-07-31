import React, { Component } from 'react';
import { Route, Switch, withRouter }    from 'react-router-dom';
import EnsureLoggedInContainer  from './containers/Private';
import * as actionTypes     from './store/actions/actions';
import { connect }          from 'react-redux';
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
let authUser = localStorage.getItem('authUser');


axios.interceptors.response.use(function (response) {
    console.log(response);
    if (response.status === 500) {
        return Promise.reject(response);
    }

    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

window.axios = axios;

if (username && password) {
    if (authUser) {
        authUser = JSON.parse(authUser);
    }
    
    store.dispatch({type: actionTypes.LOGIN_ON_REFRESH, user: authUser});

    
    window.axios.myInterceptor = axios.interceptors.request.use( config => {
        config['withCredentials'] = true;
        config['auth'] = { username, password };
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
}

function axiosListener() {
    const state = store.getState();
    if (!state.username && !state.password) {
        window.axios.interceptors.request.eject(axios.myInterceptor);
    }
    else {
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

    state = {
        isLoggedIn : false
    };

    render() {

        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/login"        component={Login} />
                        <Route path="/Logout"       component={Logout} />
                        
                        <EnsureLoggedInContainer>
                            <Route path="/" exact       component={Home} />
                            <Route path="/user"         component={Users}/>
                            <Route path="/plants"       component={Plants}/>
                            <Route path="/plant/:id"    component={Plant} />
                            <Route path="/Rooms"        component={Rooms} />
                            <Route path="/Locations"    component={Locations} />
                        </EnsureLoggedInContainer>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}
export default withRouter(connect(mapStateToProps)(App));
// export default  App;
