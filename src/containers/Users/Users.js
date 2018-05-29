import React, {Component}   from 'react';
import axios                from 'axios';
import qs                   from 'qs';
import User                 from '../../components/User/User';
import Usercontrols         from '../../components/User/Usercontrols/Usercontrols';
import NewUserForm          from '../../components/User/Newuserform/Newuserform';
import Modal                from '../../components/UI/Modal/Modal';
import DeleteModal          from '../../components/User/Deletemodal/Deletemodal';


class Users extends Component {


    state = {
        users: [],
        groups: [],
        newUserData: {},
        newUser: false,
        deleteModal: false,
        deleteId: null,
        deleteName: null,
        search: ''
    }

    componentDidMount () {
        axios.get('/user')
            .then( response => {
                console.log(response);
                if (response.data) {
                    var data = response.data.data;
                    this.setState({users:data});
                }
        }).catch( response => {
            console.log(response);
        });

    }

    removeFormHandler = () => {
        this.setState({newUser:false})
    }

    setGroups = (groups) => {
        this.setState({groups: groups});
    }

    onSearchChange = (value) => {
        this.setState({search: value})
    }

    clearSearch = (e) => {
        e.preventDefault();
        this.setState({search: ''});
    }

    updateForm = (value) => {

        const newUserData = {
            ...this.state.newUserData,
            ...value
        };
        this.setState({newUserData});
    }

    addUserHandler = (e) => {
        e.preventDefault();

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
                
    deleteUserHandler = () => {

        axios.delete('/user/' + this.state.deleteId)
        .then( response => {
            
            const users = this.state.users.filter( user => {
                return user.id !== this.state.deleteId;
            });
            
            this.setState({users:users});
            
            this.removeModal();

        }).catch( response => {
            console.log(response);
        });

    }

    newUserHandler = () => {
        this.setState({newUser: true});
    }

    showModal = (userid, username) => {
        this.setState({
            deleteModal: true, 
            deleteId: userid, 
            deleteName: username
        });
    }

    removeModal = () => {
        this.setState({
            deleteModal:false, 
            deleteId: null, 
            deleteName: null 
        });
    }




    render() {

        let newUserForm = null;
        
        if (this.state.newUser) {
            newUserForm = <Modal show="true">
                            <NewUserForm 
                                removeForm={this.removeFormHandler}
                                updateForm={this.updateForm}
                             addUser={this.addUserHandler} 
                              setGroups={this.setGroups}
                            />
                        </Modal>
        }

        let deleteModal = null;
        if (this.state.deleteModal) {
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeModal}>
                            <DeleteModal 
                                deleteUser={this.deleteUserHandler} 
                                removeModal={this.removeModal}
                                username={this.state.deleteName}
                                />
                        </Modal>
        }


        const users = this.state.users.filter((user) => {
            return  this.state.search === '' || 
                    user.firstname.indexOf(this.state.search) !== -1 ||
                    user.lastname.indexOf(this.state.search) !== -1 ||
                    user.username.indexOf(this.state.search) !== -1;
        }).map(user => { 
            return (
                <User   key         = {user.id} 
                        userid      = {user.id}
                        firstname   = {user.firstname}
                        lastname    = {user.lastname}
                        username    = {user.username}
                        delete      = {this.showModal}
                        email       = {user.email}
                        group       = {user.groupname}
                />
            );
        });




        return (
            <div className="Users">
                <Usercontrols 
                    newUser={this.newUserHandler}
                    updateSearch={this.onSearchChange}
                    clearSearch={this.clearSearch}
                    search={this.state.search}
                    />
                {newUserForm}
                {deleteModal}
                {users}
            </div>
        );
    }
}

export default Users;