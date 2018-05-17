import React, {Component} from 'react';
import axios from 'axios';
import User from '../../components/User/User';
import Usercontrols from '../../components/User/Usercontrols/Usercontrols';
import NewUserForm from '../../components/User/Newuserform/Newuserform';

class Users extends Component {


    state = {
        users: [],
        groups: [],
        newUserData: {},
        newUser: false
    }

    componentDidMount () {
        axios.get('/user')
            .then( response => {
                var data = response.data.data;
            console.log(data);
            this.setState({users:data});
        }).catch( response => {
            console.log(response);
        });

    }

    removeFormHandler = () => {
        console.log('removing form!!');
        this.setState({newUser:false})
    }

    updateForm = (value) => {
        const key = Object.keys(value)[0];
        console.log(key);
        const user = {
            ...this.state.newUserData,
            ...value
        };
        this.setState({newUserData: user}, () => {
            console.log(this.state);
        });
    }

    addUserHandler = (e) => {
        e.preventDefault();
        console.log('adding user now');
        axios.post('/user', this.state.newUserData)
            .then( response => {
                var data = response;
                // this.setState({users:data});
            }).catch( response => {
                console.log(response);
            });
    }

    newUserHandler = () => {
        this.setState({newUser: true});
    }

    render() {

        let newUserForm = null;
        
        if (this.state.newUser) {
            newUserForm = <NewUserForm 
                            removeForm={this.removeFormHandler}
                            updateForm={this.updateForm}
                            addUser={this.addUserHandler} 
                            />
        }
        const users = this.state.users.map(user => {
            return (
                <User   key     = {user.id} 
                        userid = {user.id}
                        firstname = {user.firstname}
                        lastname = {user.lastname}
                        username = {user.username}
                />
            );
        });




        return (
            <div className="Users">
                <h3>This site has HEAPS of users!</h3>
                <Usercontrols newUser={this.newUserHandler}/>
                {newUserForm}
                {users}
            </div>
        );
    }
}

export default Users;