import React, {Component}   from 'react';
import NewUserForm          from '../../components/User/Newuserform/Newuserform';
import DeleteModal          from '../../components/User/Deletemodal/Deletemodal';
import Usersearch           from '../../components/User/Usercontrols/Usersearch';
import Controls             from '../../components/Controls/Controls';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import User                 from '../../components/User/User';
import qs                   from 'qs';



class Users extends Component {


    state = {
        users: [],
        groups: [],
        search: '',
        newUser: false,
        deleteId: null,
        deleteName: null,
        deleteModal: false,
        newUserData: {},
    }

    componentDidMount () {
        this.fetchUsers();
    }

    fetchUsers = () => {
        axios.get('/user')
            .then( response => {
                console.log(response);
                if (response.data) {
                    let data = response.data.data;
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                    this.setState({users:data});
                }
        }).catch( response => {
            console.log(response);
        });
    }

    removeFormHandler = () => {
        console.log('new user is false as well!!!');
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
        console.log('deleee user handler??');
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

    newUserHandler = (e) => {
        e.stopPropagation();
        console.log('new user is true');
        this.setState({newUser: true}, () => {
            console.log(this.state);
        });
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
        console.log('rendering users');
        let newUserForm = null;
        console.log(this.state);
        if (this.state.newUser) {
            console.log('yeah new user form');
            newUserForm = <Modal show="true">
                            <NewUserForm 
                                removeForm ={this.removeFormHandler}
                                updateForm ={this.updateForm}
                                addUser    ={this.addUserHandler} 
                                setGroups  ={this.setGroups}
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


        let users = null;
        console.log(this.state.users);
        if (this.state.users) {
            users = this.state.users.filter((user) => {
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
        }




        return (
            <div className="Users">
                
                <Controls 
                    newItem  = {this.newUserHandler} 
                    editItem = {this.editData}
                    cancel   = {this.showDeleteModal} 
                    adButton = {this.state.new}
                    update   = {this.state.selectedData != null || '' }
                    click    = {this.removeFormHandler}
                />


                <Usersearch 
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