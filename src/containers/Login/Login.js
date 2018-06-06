import React, {Component}   from 'react';
import * as actionTypes     from '../../store/actions';
import { Redirect }         from 'react-router-dom';
import { connect }          from 'react-redux';
import Button               from '../../components/UI/Button/Button';


class Login extends Component {

    state = {
        username: '',
        password: '',
        isLoggedIn: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to="/plants" />;
        }

        return (
            <div className="login bb">

                <form className="login-form">
                    <div>
                        {/* <label>Username</label> */}
                        <input className="login-form__input" type="text" name="username" placeholder="Username" value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}}/>
                    </div>
                    <div>
                        {/* <label>Paswword</label> */}
                        <input className="login-form__input" type="text" name="password"  placeholder="Password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                   </div>
                   
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
            localStorage.setItem('username', user);
            localStorage.setItem('password', pass);
            dispatch({type: actionTypes.LOGIN, login: {username:user, password:pass}});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);