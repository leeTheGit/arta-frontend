import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
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

    setGroups = (groups) => {
        this.setState({groups: groups});
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
        console.log(this.state.newUserData);

        const newUser = {...this.state.newUserData};
        axios.post('/user', qs.stringify(newUser))
            .then( response => {
                var id = response.data.data.id;
                newUser['id'] = id;
                const users = [...this.state.users];
                users.push(newUser);
                this.setState({ 
                    users:users,
                    newUser: false, 
                    newUserData: {} 
                });
            }).catch( response => {
                console.log(response);
            });
    }
                
    deleteUserHandler = (e) => {
        e.preventDefault();
        console.log('deleting user');
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
                            setGroups={this.setGroups}
                            />
        }
        const users = this.state.users.map(user => {
            return (
                <User   key         = {user.id} 
                        userid      = {user.id}
                        firstname   = {user.firstname}
                        lastname    = {user.lastname}
                        username    = {user.username}
                        delete      = {this.deleteUserHandler}
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