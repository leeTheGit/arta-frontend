import React, {Component}   from 'react';
import classes              from './Login.css';
import Button               from '../../components/UI/Button/Button';
import { connect }          from 'react-redux';
import * as actionTypes     from '../../store/actions';


// Have set up Redux but dispatch function not preventing default

class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggedIn: false
    }

    // loginHandler = (e) => {
    //     e.preventDefault();
    //     // this.
    //     console.log(this.props);
    //     this.props.history.push('/');
    // }


    render() {
        return (
            <div className={classes.Login}>
                <h2>A login form!</h2>
                <form>
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}}/>
                    <label>Paswword</label>
                    <input type="text" name="password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                    <Button clicked={ e => {this.props.loginHandler(e, this.state.username, this.state.password)}}>Login</Button>
                </form>
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        username: state.username,
        password: state.password,
        isLoggedIn: state.isLoggedIn
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loginHandler: (e, user, pass) => {
            e.preventDefault();
            console.log('dispatching', user, pass);
            localStorage.setItem('username', user);
            localStorage.setItem('password', pass);
            dispatch({type: actionTypes.LOGIN, login: {username:user, password:pass}});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);